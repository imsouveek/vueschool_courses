import { mount } from '@vue/test-utils'
import {
    DEFEAT_MESSAGE,
    VICTORY_MESSAGE,
    WORD_SIZE,
    MAX_GUESS_COUNT,
    KEYBOARD_ROWS,
    type Feedback
} from '@/settings'
import { useWordleGame } from '@/composables/useWordleGame'
import WordleBoard from '../WordleBoard.vue'

const selectors = {
    generic: 'data-test',
    input: '[data-test=guess-input]',
    status: '[data-test=game-status]',
    guess_word: '[data-test^="word-"]',
    guess_word_w: (word: string) => `[data-test=word-${word}]`,
    keyboard: '[data-test=wordle-keyboard]',
    keyboard_row: '[data-test^="keyboard-row-"]',
    keyboard_row_n: (n: string) => `[data-test=keyboard-row-${n}]`,
    letter: '[data-test^="letter-"]',
    letter_l: (char: string) => `[data-test=letter-${char}]`,
    feedback: 'aria-label',
    feedback_f: (f: string) => `[aria-label=${f}]`
}
describe('WordleBoard', () => {
    const wordOfTheDay = 'TESTS'
    let wrapper: ReturnType<typeof mount>
    const { guessInProgress, guessesSubmitted, guessFeedback, isGameOver, resetGame } =
        useWordleGame()

    beforeEach(() => {
        resetGame()
        wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
        vi.useFakeTimers()
    })

    afterEach(() => {
        wrapper.unmount()
        vi.clearAllTimers()
        vi.restoreAllMocks()
    })

    async function playerTypesGuess(guess: string) {
        const guessInput = wrapper.find(selectors.input)
        await guessInput.setValue(guess)
    }

    async function playerTypesEnter() {
        const guessInput = wrapper.find(selectors.input)
        await guessInput.trigger('keydown.enter')
    }

    async function playerTypesAndSubmitsGuess(guess: string) {
        await playerTypesGuess(guess)
        await playerTypesEnter()
    }

    describe('End of the game messages', () => {
        test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay)
            expect(wrapper.find(selectors.status).text()).toContain(VICTORY_MESSAGE)
            expect(isGameOver.value).toBe(true)
        })

        describe(`A defeat message should be displayed when the user makes incorrect ${MAX_GUESS_COUNT} times`, () => {
            test.each(
                Array.from(
                    {
                        length: MAX_GUESS_COUNT + 1
                    },
                    (_, numberOfGuesses) => ({
                        numberOfGuesses,
                        shouldSeeErrorMessage: numberOfGuesses === MAX_GUESS_COUNT ? '' : 'not'
                    })
                )
            )(
                'therefore, for $numberOfGuesses guess, a defeat message $shouldSeeErrorMessage appear',
                async ({ numberOfGuesses, shouldSeeErrorMessage }) => {
                    for (let i = 0; i < numberOfGuesses; ++i) {
                        await playerTypesAndSubmitsGuess('WRONG')
                    }
                    if (!shouldSeeErrorMessage) {
                        expect(wrapper.find(selectors.status).text()).toContain(DEFEAT_MESSAGE)
                        expect(isGameOver.value).toBe(true)
                    } else {
                        expect(wrapper.find(selectors.status).exists()).toBe(false)
                        expect(isGameOver.value).toBe(false)
                    }
                }
            )
        })

        test('No end-of-game message appears when user does not make a guess', async () => {
            expect(isGameOver.value).toBe(false)
            expect(wrapper.find(selectors.status).exists()).toBe(false)
        })
    })

    describe('Rules for defining the word of the day', () => {
        beforeEach(() => {
            console.warn = vi.fn()
        })

        test.each([
            { wordOfTheDay: 'FLY', reason: `word of the day must have ${WORD_SIZE} letters` },
            { wordOfTheDay: 'Hello', reason: 'word of the day must have all uppercase alphabets' },
            { wordOfTheDay: 'QWERT', reason: 'word of the day must be a real English word' }
        ])(
            'Since $reason, $wordOfTheDay is invalid, and, a warning should be emitted',
            async ({ wordOfTheDay }) => {
                wrapper.unmount()
                wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

                expect(console.warn).toHaveBeenCalled()
            }
        )

        test(`No error should be emitted if the word is a real English word, uppercase and ${WORD_SIZE} characters`, async () => {
            expect(console.warn).not.toHaveBeenCalled()
        })
    })

    describe('Wordle Grid', () => {
        test('All previous guesses submitted by player are visible in the page', async () => {
            const guesses = ['HELLO', 'WORLD', 'HAPPY', 'CODER', 'THREE', 'SEVEN']

            for (const guess of guesses) {
                await playerTypesAndSubmitsGuess(guess)
            }

            for (const guess of guesses) {
                expect(wrapper.text()).toContain(guess)
                expect(guessesSubmitted.value).toContain(guess)
            }
        })

        describe(`Entire grid of ${MAX_GUESS_COUNT} attempts and ${WORD_SIZE} letters should be visible`, () => {
            const guesses = ['HELLO', 'WORLD', 'HAPPY', 'CODER', 'THREE', 'SEVEN']
            test.each(
                Array.from({ length: MAX_GUESS_COUNT + 1 }, (_, i) => ({
                    numberOfGuesses: i,
                    numberOfInputElements: i === MAX_GUESS_COUNT ? 0 : 1
                }))
            )(
                'Grid should be visible and there should be $numberOfInputElements inputs',
                async ({ numberOfGuesses, numberOfInputElements }) => {
                    for (let i = 0; i < numberOfGuesses; ++i) {
                        await playerTypesAndSubmitsGuess(guesses[i])
                    }

                    expect(wrapper.findAll(selectors.guess_word).length).toEqual(MAX_GUESS_COUNT)
                    expect(wrapper.findAll<HTMLInputElement>(selectors.input).length).toEqual(
                        numberOfInputElements
                    )
                }
            )
        })

        describe('Displaying hints/feedback to the player', () => {
            const collectedFeedback = () => {
                return wrapper.findAll(selectors.letter).reduce((feedbackArr, element) => {
                    const attr = element.attributes(selectors.feedback)
                    if (attr && attr !== 'nofeedback') {
                        feedbackArr.push(attr as Feedback)
                    }
                    return feedbackArr
                }, [] as Feedback[])
            }
            test('hints are not displayed until the player submits their guess', async () => {
                expect(
                    collectedFeedback().length,
                    'Feedback was being rendered before the player started typing their guess'
                ).toBe(0)
                expect(guessFeedback.value[0]).toBeUndefined()

                await playerTypesGuess(wordOfTheDay)
                expect(
                    collectedFeedback().length,
                    'Feedback was rendered while the player was typing their guess'
                ).toBe(0)
                expect(guessFeedback.value[0]).toBeUndefined()

                await playerTypesEnter()
                expect(
                    collectedFeedback().length,
                    'Feedback was not rendered after the player submitted their guess'
                ).not.toBe(0)
                expect(guessFeedback.value[0]).not.toBeUndefined()
            })
        })

        describe('If the word of the day is "WORLD" and the guess is "WRONG"', () => {
            const wordOfTheDay = 'WORLD'
            const guess = 'WRONG'

            test.each([
                {
                    position: 0,
                    feedback: 'correct',
                    message: 'W is the first letter of both "WORLD" and "WRONG"'
                },
                {
                    position: 1,
                    feedback: 'almost',
                    message: 'R exists in both "WORLD" and "WRONG" but in different positions'
                },
                {
                    position: 2,
                    feedback: 'almost',
                    message: 'O exists in both "WORLD" and "WRONG" but in different positions'
                },
                {
                    position: 3,
                    feedback: 'incorrect',
                    message: 'N is not present in "WORLD"'
                },
                {
                    position: 4,
                    feedback: 'incorrect',
                    message: 'G is not present in "WORLD"'
                }
            ])(
                'At position $position, feedback should be $feedback because $message',
                async ({ position, feedback }) => {
                    wrapper.unmount()
                    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

                    await playerTypesAndSubmitsGuess(guess)

                    expect(guessFeedback.value[0][position]).toBe(feedback)

                    const actualFeedback = wrapper
                        .findAll(selectors.guess_word)[0]
                        .findAll(selectors.letter)
                        .at(position)
                        ?.attributes(selectors.feedback)
                    expect(actualFeedback).toBe(feedback)
                }
            )
        })
    })

    describe('Player Input', () => {
        test('Input should remain in focus the entire time', async () => {
            document.body.innerHTML = '<div id="app"></div>'
            wrapper.unmount()
            wrapper = mount(WordleBoard, { props: { wordOfTheDay }, attachTo: '#app' })

            expect(wrapper.find(selectors.input).attributes('autofocus')).not.toBeUndefined()
            await wrapper.find(selectors.input).trigger('blur')
            expect(document.activeElement).toBe(wrapper.find(selectors.input).element)
        })

        test('Input should not be displayed after player submits correct guess', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay)

            expect(wrapper.findAll(selectors.input).length).toBe(0)
        })

        test(`Input should not be displayed after player submits ${MAX_GUESS_COUNT} incorrect guesses`, async () => {
            const guesses = ['HELLO', 'WORLD', 'HAPPY', 'CODER', 'THREE', 'SEVEN']

            for (const guess of guesses) {
                await playerTypesAndSubmitsGuess(guess)
            }

            expect(wrapper.findAll(selectors.input).length).toBe(0)
        })

        test('Input should be cleared after player submits guess', async () => {
            await playerTypesAndSubmitsGuess('PRINT')

            expect(wrapper.find<HTMLInputElement>(selectors.input).element.value).toEqual('')
            expect(guessInProgress.value).toEqual('')
        })

        test(`Player guesses are limited to $WORD_SIZE letters`, async () => {
            await playerTypesGuess(wordOfTheDay + 'EXTRA')

            expect(wrapper.find<HTMLInputElement>(selectors.input).element.value).toEqual(
                wordOfTheDay
            )
            expect(guessInProgress.value).toEqual(wordOfTheDay)

            await playerTypesAndSubmitsGuess(wordOfTheDay + 'EXTRA')
            expect(wrapper.find(selectors.guess_word_w(wordOfTheDay)).exists()).toBe(true)
            expect(guessesSubmitted.value).toContain(wordOfTheDay)
        })

        test('Player guesses can only be submitted if they are real words', async () => {
            await playerTypesAndSubmitsGuess('QWERT')

            expect(guessesSubmitted.value).not.toContain('QWERT')
            expect(wrapper.find(selectors.status).exists()).toBe(false)
        })

        test('Player guesses are not case-sensitive', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay.toLowerCase())

            expect(wrapper.find(selectors.guess_word_w(wordOfTheDay)).exists()).toBe(true)
            expect(guessesSubmitted.value).toContain(wordOfTheDay)
            expect(wrapper.find(selectors.status).text()).toContain(VICTORY_MESSAGE)
        })

        test('Player guesses can only contain letters', async () => {
            await playerTypesGuess('H3R!T')

            expect(wrapper.find<HTMLInputElement>(selectors.input).element.value).toContain('HRT')
            expect(guessInProgress.value).toEqual('HRT')
        })

        test('Non-alphabet characters do not render on screen when typed', async () => {
            await playerTypesGuess('333')

            expect(wrapper.find<HTMLInputElement>(selectors.input).element.value).toEqual('')
            expect(guessInProgress.value).toEqual('')
        })
    })

    describe('Onscreen keyboard should be available to input charcters', () => {
        const guesses = ['HELLO', 'WORLD', 'HAPPY', 'CODER', 'THREE', 'SEVEN']

        test.each(
            Array.from({ length: WORD_SIZE + 1 }, (_, i) => ({
                guess: i,
                message: i === 0 ? 'at beginning' : `after ${i} guess(es)`
            }))
        )('Keyboard should be visible $message and have 3 rows ', async ({ guess }) => {
            for (let i = 0; i < guess; ++i) {
                await playerTypesAndSubmitsGuess(guesses[i])
            }
            expect(wrapper.find(selectors.keyboard).exists()).toBe(true)
        })

        describe.each(KEYBOARD_ROWS)(
            'Row $row should exist and contains letters',
            ({ row, letters }) => {
                test(`Row ${row} should be visible`, async () => {
                    expect(wrapper.find(selectors.keyboard_row_n(row.toString())).exists()).toBe(
                        true
                    )
                })

                test.each(letters)(`Row ${row} should contain letter $0`, async (letter) => {
                    expect(
                        wrapper
                            .find(selectors.keyboard_row_n(row.toString()))
                            .find(selectors.letter_l(letter))
                            .exists()
                    ).toBe(true)
                })

                describe.each(letters)('Clicking $0 should work', (letter) => {
                    let letterComponent: ReturnType<typeof wrapper.find>

                    beforeEach(() => {
                        letterComponent = wrapper
                            .find(selectors.keyboard)
                            .find(selectors.letter_l(letter))
                    })

                    test(`Click ${letter} should add letter to input component`, async () => {
                        if (letter === 'backspace' || letter === 'enter') {
                            playerTypesGuess('TESTS')
                        }
                        await letterComponent.trigger('click')

                        if (letter === 'backspace') {
                            expect(
                                wrapper.find<HTMLInputElement>(selectors.input).element.value
                            ).toEqual('TEST')
                        } else if (letter === 'enter') {
                            expect(wrapper.find(selectors.status).text()).toContain(VICTORY_MESSAGE)
                        } else {
                            expect(
                                wrapper.find<HTMLInputElement>(selectors.input).element.value
                            ).toEqual(letter)
                        }
                    })
                })
            }
        )

        test('Expect consolidated keyboard feedback for each letter after entering each guess', async () => {
            const guesses = [
                {
                    word: 'QUEST',
                    result: {
                        correct: [],
                        almost: ['E', 'S', 'T'],
                        incorrect: ['Q', 'U'],
                        nofeedback: []
                    }
                },
                {
                    word: 'SETUP',
                    result: {
                        correct: ['E'],
                        almost: ['S', 'T'],
                        incorrect: ['P', 'Q', 'U'],
                        nofeedback: []
                    }
                },
                {
                    word: 'TENTS',
                    result: {
                        correct: ['E', 'S', 'T'],
                        almost: [],
                        incorrect: ['N', 'P', 'Q', 'U'],
                        nofeedback: []
                    }
                },
                {
                    word: 'WORLD',
                    result: {
                        correct: ['E', 'S', 'T'],
                        almost: [],
                        incorrect: ['D', 'L', 'N', 'O', 'P', 'Q', 'R', 'U', 'W'],
                        nofeedback: []
                    }
                },
                {
                    word: 'STEMS',
                    result: {
                        correct: ['E', 'S', 'T'],
                        almost: [],
                        incorrect: ['D', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'U', 'W'],
                        nofeedback: []
                    }
                },
                {
                    word: 'ABCDE',
                    result: {
                        correct: ['E', 'S', 'T'],
                        almost: [],
                        incorrect: ['D', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'U', 'W'],
                        nofeedback: ['A', 'B', 'C']
                    }
                }
            ]

            type FeedbackKey = 'correct' | 'almost' | 'incorrect' | 'nofeedback'
            const feedbackTypes: FeedbackKey[] = ['correct', 'almost', 'incorrect', 'nofeedback']

            const lettersByCriteria = (feedback: string) => {
                return wrapper
                    .find(selectors.keyboard)
                    .findAll(selectors.feedback_f(feedback))
                    .map((el) => {
                        const testAttr = el.attributes(selectors.generic)
                        const match = testAttr?.match(/^letter-(.)$/)
                        return match?.[1] || null
                    })
                    .filter((l): l is string => !!l)
            }
            for (const guess of guesses) {
                await playerTypesAndSubmitsGuess(guess.word)
                for (const feedback of feedbackTypes) {
                    if (feedback !== 'nofeedback') {
                        expect(
                            lettersByCriteria(feedback).sort(),
                            `Test with word ${guess.word} failed because ${feedback} letters don't match`
                        ).toEqual(guess.result[feedback])
                    } else {
                        expect(
                            lettersByCriteria(feedback),
                            `Test with word ${guess.word} failed because ${feedback} letters don't match`
                        ).toEqual(expect.arrayContaining(guess.result[feedback]))
                    }
                }
            }
        })
    })
})

import { mount, VueWrapper } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import WordleLetter from '../WordleLetter.vue'
import {
    DEFEAT_MESSAGE,
    VICTORY_MESSAGE,
    WORD_SIZE,
    MAX_GUESS_COUNT,
    KEYBOARD_ROWS,
    type Feedback
} from '@/settings'
import { useWordleGame } from '@/composables/useWordleGame'
import GuessKeyboard from '../GuessKeyboard.vue'
import GuessView from '../GuessView.vue'

describe('WordleBoard', () => {
    const wordOfTheDay = 'TESTS'
    let wrapper: ReturnType<typeof mount>
    const {
        guessInProgress,
        guessesSubmitted,
        guessFeedback,
        isGameOver,
        setWordOfTheDay,
        resetGame
    } = useWordleGame()

    beforeEach(() => {
        resetGame()
        wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
        setWordOfTheDay(wordOfTheDay)
        vi.useFakeTimers()
    })

    afterEach(() => {
        wrapper.unmount()
        vi.clearAllTimers()
        vi.restoreAllMocks()
    })

    async function playerTypesGuess(guess: string) {
        const guessInput = wrapper.find('input[type=text]')
        await guessInput.setValue(guess)
    }

    async function playerTypesEnter() {
        const guessInput = wrapper.find('input[type=text]')
        await guessInput.trigger('keydown.enter')
    }

    async function playerTypesAndSubmitsGuess(guess: string) {
        await playerTypesGuess(guess)
        await playerTypesEnter()
    }

    describe('End of the game messages', () => {
        test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay)
            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
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
                        expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
                        expect(isGameOver.value).toBe(true)
                    } else {
                        expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
                        expect(isGameOver.value).toBe(false)
                    }
                }
            )
        })

        test('No end-of-game message appears when user does not make a guess', async () => {
            expect(isGameOver.value).toBe(false)
            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
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
                setWordOfTheDay(wordOfTheDay)

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

                    expect(wrapper.findAllComponents(GuessView).length).toEqual(MAX_GUESS_COUNT)
                    expect(wrapper.findAll<HTMLInputElement>('input[type=text]').length).toEqual(
                        numberOfInputElements
                    )
                }
            )
        })

        describe('Displaying hints/feedback to the player', () => {
            const collectedFeedback = () => {
                return wrapper.findAllComponents(WordleLetter).reduce((feedbackArr, element) => {
                    if (element.vm.feedback) {
                        feedbackArr.push(element.vm.feedback)
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
                    setWordOfTheDay(wordOfTheDay)
                    await playerTypesAndSubmitsGuess(guess)

                    expect(guessFeedback.value[0][position]).toBe(feedback)

                    const actualFeedback = wrapper
                        .findAllComponents(GuessView)[0]
                        .findAllComponents(WordleLetter)
                        .at(position)?.vm.feedback
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
            setWordOfTheDay(wordOfTheDay)

            expect(wrapper.find('input[type=text]').attributes('autofocus')).not.toBeUndefined()
            await wrapper.find('input[type=text]').trigger('blur')
            expect(document.activeElement).toBe(wrapper.find('input[type=text]').element)
        })

        test('Input should not be displayed after player submits correct guess', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay)

            expect(wrapper.findAll('input[type=text]').length).toBe(0)
        })

        test(`Input should not be displayed after player submits ${MAX_GUESS_COUNT} incorrect guesses`, async () => {
            const guesses = ['HELLO', 'WORLD', 'HAPPY', 'CODER', 'THREE', 'SEVEN']

            for (const guess of guesses) {
                await playerTypesAndSubmitsGuess(guess)
            }

            expect(wrapper.findAll('input[type=text]').length).toBe(0)
        })

        test('Input should be cleared after player submits guess', async () => {
            await playerTypesAndSubmitsGuess('PRINT')

            expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('')
            expect(guessInProgress.value).toEqual('')
        })

        test(`Player guesses are limited to $WORD_SIZE letters`, async () => {
            await playerTypesGuess(wordOfTheDay + 'EXTRA')

            expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual(
                wordOfTheDay
            )
            expect(guessInProgress.value).toEqual(wordOfTheDay)

            await playerTypesAndSubmitsGuess(wordOfTheDay + 'EXTRA')
            expect(wrapper.findComponent(GuessView).vm.guess).toEqual(wordOfTheDay)
            expect(guessesSubmitted.value).toContain(wordOfTheDay)
        })

        test('Player guesses can only be submitted if they are real words', async () => {
            await playerTypesAndSubmitsGuess('QWERT')

            expect(guessesSubmitted.value).not.toContain('QWERT')
            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        })

        test('Player guesses are not case-sensitive', async () => {
            await playerTypesAndSubmitsGuess(wordOfTheDay.toLowerCase())

            expect(wrapper.findComponent(GuessView).vm.guess).toEqual(wordOfTheDay)
            expect(guessesSubmitted.value).toContain(wordOfTheDay)
            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test('Player guesses can only contain letters', async () => {
            await playerTypesGuess('H3R!T')

            expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toContain(
                'HRT'
            )
            expect(guessInProgress.value).toEqual('HRT')
        })

        test('Non-alphabet characters do not render on screen when typed', async () => {
            await playerTypesGuess('333')

            expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('')
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
            expect(wrapper.findComponent(GuessKeyboard).exists()).toBe(true)
        })

        describe.each(KEYBOARD_ROWS)(
            'Row $row should exist and contains letters',
            ({ row, letters }) => {
                test(`Row ${row} should be visible`, async () => {
                    expect(wrapper.find(`[data-keyboard-row="${row}"]`).exists()).toBe(true)
                })

                test(`Row ${row} should contain ${letters} letters`, async () => {
                    expect(
                        wrapper
                            .find(`[data-keyboard-row="${row}"]`)
                            .findAllComponents(WordleLetter)
                            .map((element: VueWrapper<typeof WordleLetter>) => element.vm.letter)
                    ).toEqual(letters)
                })

                describe.each(letters)('Clicking $0 should work', (letter) => {
                    let letterComponent: VueWrapper

                    beforeEach(() => {
                        letterComponent = wrapper
                            .find(`[data-keyboard-row="${row}"]`)
                            .findAllComponents(WordleLetter)
                            .filter(
                                (element: VueWrapper<typeof WordleLetter>) =>
                                    element.vm.letter === letter
                            )
                            .at(0)
                    })

                    test(`Click ${letter} should add letter to input component`, async () => {
                        if (letter === '<Backspace>' || letter === '<Enter>') {
                            playerTypesGuess('TESTS')
                        }
                        await letterComponent.trigger('click')

                        if (letter === '<Backspace>') {
                            expect(
                                wrapper.find<HTMLInputElement>('input[type=text]').element.value
                            ).toEqual('TEST')
                        } else if (letter === '<Enter>') {
                            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
                        } else {
                            expect(
                                wrapper.find<HTMLInputElement>('input[type=text]').element.value
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

            const lettersByCriteria = (feedback: Feedback | null) => {
                const keyboardComponent = wrapper.findComponent(GuessKeyboard)
                return keyboardComponent.findAllComponents(WordleLetter).reduce((list, el) => {
                    if ((!feedback && !el.vm.feedback) || el.vm.feedback === feedback) {
                        list.push(el.vm.letter)
                    }
                    return list
                }, [] as string[])
            }
            for (const guess of guesses) {
                await playerTypesAndSubmitsGuess(guess.word)
                for (const feedback of [
                    'correct',
                    'almost',
                    'incorrect',
                    null
                ] as (Feedback | null)[]) {
                    if (!feedback) {
                        expect(lettersByCriteria(feedback)).toContain(guess.result.nofeedback)
                    } else {
                        expect(lettersByCriteria(feedback)).toEqual(guess.result[feedback])
                    }
                }
            }
        })
    })
})

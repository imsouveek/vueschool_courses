import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'

describe('WordleBoard', () => {
    const wordOfTheDay = 'TESTS'
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
        wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
    })

    async function playerSubmitsGuess(guess: string) {
        const guessInput = wrapper.find('input[type=text]')
        await guessInput.setValue(guess)
        await guessInput.trigger('keydown.enter')
    }

    describe('End of the game messages', () => {
        test('A victory message appears when the user makes a guess that matches the word of the day', async () => {
            await playerSubmitsGuess(wordOfTheDay)

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test('A defeat message appears when user makes a guess that does not match the word of the day', async () => {
            await playerSubmitsGuess('WRONG')

            expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
        })

        test('No end-of-game message appears when user does not make a guess', async () => {
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
                wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

                expect(console.warn).toHaveBeenCalled()
            }
        )

        test(`No error should be emitted if the word is a real English word, uppercase and ${WORD_SIZE} characters`, async () => {
            wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

            expect(console.warn).not.toHaveBeenCalled()
        })
    })

    describe('Player Input', () => {
        test('Input should remain in focus the entire time', async () => {
            document.body.innerHTML = '<div id="app"></div>'
            wrapper = mount(WordleBoard, { props: { wordOfTheDay }, attachTo: '#app' })

            expect(wrapper.find('input[type=text]').attributes('autofocus')).not.toBeUndefined()

            await wrapper.find('input[type=text]').trigger('blur')

            expect(document.activeElement).toBe(wrapper.find('input[type=text]').element)
        })
        test(`Player guesses are limited to $WORD_SIZE letters`, async () => {
            await playerSubmitsGuess(wordOfTheDay + 'EXTRA')

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test('Player guesses can only be submitted if they are real words', async () => {
            await playerSubmitsGuess('QWERT')

            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        })

        test('Player guesses are not case-sensitive', async () => {
            await playerSubmitsGuess(wordOfTheDay.toLowerCase())

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test('Player guesses can only contain letters', async () => {
            await playerSubmitsGuess('H3R!T')

            expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toContain(
                'HRT'
            )
        })
    })

    test('Non-alphabet characters do not render on screen when typed', async () => {
        await playerSubmitsGuess('333')

        expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('')
    })
})

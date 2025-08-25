import { useWordleGame } from '@/composables/useWordleGame'
import { MAX_GUESS_COUNT } from '@/settings'

describe('useWordleGame composable', () => {
    const word = 'CRANE'
    let game: ReturnType<typeof useWordleGame>

    beforeEach(() => {
        game = useWordleGame()
        game.resetGame()
        game.setWordOfTheDay(word)
        vi.useFakeTimers()
    })

    it('initializes empty state', () => {
        expect(game.guessInProgress.value).toBe('')
        expect(game.guessesSubmitted.value).toEqual([])
        expect(game.guessFeedback.value).toEqual([])
        expect(game.invalidWordError.value).toBe(false)
        expect(game.letterFeedback.value.size).toBe(0)
    })

    it('validates word correctly', () => {
        expect(game.validateWord('HELLO')).toBe(true)
        expect(game.validateWord('ABCDE')).toBe(false)
    })

    it('updates guessInProgress with processInput (limit to 5 uppercase letters)', () => {
        game.processInput('hell123;OYZ')
        expect(game.guessInProgress.value).toBe('HELLO')
    })

    it('handles keypress: character, backspace, enter', () => {
        game.handleKeyPress('A')
        game.handleKeyPress('B')
        expect(game.guessInProgress.value).toBe('AB')

        game.handleKeyPress('backspace')
        expect(game.guessInProgress.value).toBe('A')

        game.processInput('TESTS')
        game.handleKeyPress('enter')
        expect(game.guessesSubmitted.value).toContain('TESTS')
    })

    it('does not submit if word is invalid', () => {
        game.processInput('ZZZZZ')
        game.handleSubmit()
        expect(game.guessesSubmitted.value).not.toContain('ZZZZZ')
        expect(game.invalidWordError.value).toBe(true)

        vi.runAllTimers()
        expect(game.invalidWordError.value).toBe(false)
    })

    it('correctly determines game over (win)', () => {
        game.processInput(word)
        game.handleSubmit()
        expect(game.isGameOver.value).toBe(true)
    })

    it('correctly determines game over (loss)', () => {
        for (let i = 0; i < MAX_GUESS_COUNT; i++) {
            game.processInput('GUESS')
            game.handleSubmit()
        }
        expect(game.isGameOver.value).toBe(true)
    })

    it('correctly computes feedback', () => {
        game.processInput('CRAZY')
        game.handleSubmit()
        const fb = game.guessFeedback.value[0]
        expect(fb).toEqual([
            'correct', // C
            'correct', // R
            'correct', // A
            'incorrect', // Z
            'incorrect' // Y
        ])
    })

    it('updates letterFeedback with strongest signal', () => {
        game.processInput('COPED')
        game.handleSubmit()
        expect(game.letterFeedback.value.get('C')).toBe('correct')
        expect(game.letterFeedback.value.get('O')).toBe('incorrect')
        expect(game.letterFeedback.value.get('E')).toBe('almost')
    })

    it('pendingAttempts is computed correctly', () => {
        expect(game.pendingAttempts.value).toBe(MAX_GUESS_COUNT - 1)
        game.processInput('TESTS')
        game.handleSubmit()
        expect(game.pendingAttempts.value).toBe(MAX_GUESS_COUNT - 2)
    })

    it('throws if wordOfTheDay is not set', () => {
        game.resetGame()
        expect(() => game.isGameOver.value).toThrow()
        expect(() => game.handleSubmit()).not.toThrow() // fails silently on validate
        expect(() => game.guessFeedback.value).not.toThrow()
    })
})

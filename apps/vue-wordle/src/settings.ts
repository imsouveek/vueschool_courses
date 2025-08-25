export const VICTORY_MESSAGE = 'You Won!'
export const DEFEAT_MESSAGE = 'Better luck next time!'
export const WORD_SIZE = 5
export const MAX_GUESS_COUNT = 6
export const KEYBOARD_ROWS = [
    {
        row: 1,
        letters: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'backspace']
    },
    {
        row: 2,
        letters: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'enter']
    },
    {
        row: 3,
        letters: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    }
]
export type Feedback = 'correct' | 'incorrect' | 'almost'

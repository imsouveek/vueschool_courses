import { ref, computed, readonly } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { MAX_GUESS_COUNT, WORD_SIZE, type Feedback } from '@/settings'

const guessInProgress = ref('')
const invalidWordError = ref(false)
const guessesSubmitted = ref<string[]>([])
const guessFeedback = ref<Feedback[][]>([])
const wordOfTheDay = ref('')
const letterFeedback = ref<Feedback[][]>([])

export const useWordleGame = () => {
    const isGameOver = computed(() => {
        if (!wordOfTheDay.value) {
            throw new Error('Word of the Day is not set')
        }
        return (
            guessesSubmitted.value.length === MAX_GUESS_COUNT ||
            guessesSubmitted.value.includes(wordOfTheDay.value)
        )
    })

    const pendingAttempts = computed(
        () => MAX_GUESS_COUNT - guessesSubmitted.value.length - (isGameOver.value ? 0 : 1)
    )

    const resetGame = () => {
        guessInProgress.value = ''
        invalidWordError.value = false
        guessesSubmitted.value = []
        wordOfTheDay.value = ''
        guessFeedback.value = []
        letterFeedback.value = []
    }

    const setWordOfTheDay = (word: string) => (wordOfTheDay.value = word)

    const validateWord = (word: string) => englishWords.includes(word)

    const handleSubmit = () => {
        if (!validateWord(guessInProgress.value)) {
            invalidWordError.value = true
            setTimeout(() => (invalidWordError.value = false), 300)
            return
        }

        guessesSubmitted.value.push(guessInProgress.value)
        updateGuessFeedback()
        // updateLetterFeedback()
        guessInProgress.value = ''
    }

    const updateGuessFeedback = () => {
        if (!wordOfTheDay.value) {
            throw new Error('Word of the Day is not set')
        }
        guessFeedback.value.push(
            guessInProgress.value.split('').map((char, index): Feedback => {
                if (char === wordOfTheDay.value.charAt(index)) return 'correct'
                if (!wordOfTheDay.value.includes(char)) return 'incorrect'
                return 'almost'
            })
        )
    }

    const handleKeyPress = (key: string) => {
        if (key === '<Enter>') {
            handleSubmit()
        } else if (key === '<Backspace>') {
            guessInProgress.value = guessInProgress.value.slice(0, -1)
        } else {
            guessInProgress.value = guessInProgress.value + key
            processInput(guessInProgress.value)
        }
    }

    const processInput = (word: string) => {
        guessInProgress.value = word
            .substring(0, WORD_SIZE)
            .toUpperCase()
            .replace(/[^A-Z]+/gi, '')
    }

    return {
        guessInProgress,
        invalidWordError: readonly(invalidWordError),
        guessesSubmitted: readonly(guessesSubmitted),
        isGameOver: readonly(isGameOver),
        pendingAttempts: readonly(pendingAttempts),
        guessFeedback: readonly(guessFeedback),
        letterFeedback: readonly(letterFeedback),
        resetGame,
        setWordOfTheDay,
        handleKeyPress,
        processInput,
        validateWord,
        handleSubmit
    }
}

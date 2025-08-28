import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(20000)
    await page.goto('/')
})

const wrongGuessesList = ['GUESS', 'QUEST', 'HELLO', 'BARON', 'CODER', 'GLASS']

const invalidWord = 'ABCDE'

const correctWord = 'TESTS'

const testIds = {
    status: 'game-status',
    word: 'word-',
    word_w: (w) => `word-${w}`,
    letter: 'letter-',
    letter_l: (l) => `letter-${l}`,
    keyboard: 'wordle-keyboard'
}
const feedback = {
    attribute: 'aria-label',
    values: ['correct', 'almost', 'incorrect']
}
test.describe('Wordle', () => {
    test('Game should start with empty grid', async ({ page }) => {
        expect(await page.locator('#app').screenshot()).toMatchSnapshot('game-init.png')
    })

    test('Grid should be populated when user types guess', async ({ page }) => {
        const word = correctWord
        await page.keyboard.type(word)

        const inputWord = await page.getByTestId(testIds.word).first()
        for (let i = 0; i < word.length; ++i) {
            expect(await inputWord.getByTestId(testIds.letter_l(word[i]))).toBeDefined()
        }
    })

    test('Grid should be populated when user clicks letters', async ({ page }) => {
        const word = correctWord
        const keyboard = await page.getByTestId(testIds.keyboard)
        const inputWord = await page.getByTestId(testIds.word)

        for (let i = 0; i < word.length; ++i) {
            await keyboard.getByTestId(testIds.letter_l(word[i])).click()
            expect(await inputWord.getByTestId(testIds.letter_l(word[i]))).toBeDefined()
        }
    })

    test('Game should not accept invalid words', async ({ page }) => {
        const word = invalidWord
        await page.keyboard.type(word)
        await page.keyboard.press('Enter')

        await expect(page.getByTestId(testIds.word_w(word))).toHaveCount(0)
        const inputWord = await page.getByTestId(testIds.word).first()
        const keyboard = await page.getByTestId(testIds.keyboard)

        for (let i = 0; i < word.length; ++i) {
            const letterDiv = await inputWord.locator('[data-test^="letter-"]').nth(i)
            await expect(letterDiv).toHaveText(word[i])
            expect(letterDiv).toHaveAttribute(feedback.attribute, 'nofeedback')
            expect(await keyboard.getByTestId(testIds.letter_l(word[i]))).toHaveAttribute(
                feedback.attribute,
                'nofeedback'
            )
        }
    })

    test(' Game should accept and provide letter feedback for incorrect words', async ({
        page
    }) => {
        const word = wrongGuessesList[0]
        await page.keyboard.type(word)
        await page.keyboard.press('Enter')

        const inputWord = page.getByTestId(testIds.word_w(word))
        await expect(inputWord).toHaveCount(1)
        const keyboard = await page.getByTestId(testIds.keyboard)
        const gridFeedback = ['incorrect', 'incorrect', 'almost', 'almost', 'correct']
        const keyboardFeedback = ['incorrect', 'incorrect', 'almost', 'correct', 'correct']

        for (let i = 0; i < word.length; ++i) {
            const letterDiv = await inputWord.locator('[data-test^="letter-"]').nth(i)
            await expect(letterDiv).toHaveText(word[i])
            await expect(letterDiv).toHaveAttribute(feedback.attribute, gridFeedback[i])
            await expect(keyboard.getByTestId(testIds.letter_l(word[i]))).toHaveAttribute(
                feedback.attribute,
                keyboardFeedback[i]
            )
        }
        expect(await page.getByTestId(testIds.status)).not.toBeVisible()
    })

    test('Game should end with failure message when 6 incorrect words are entered', async ({
        page
    }) => {
        for (let i = 0; i < 6; ++i) {
            await page.keyboard.type(wrongGuessesList[i])
            await page.keyboard.press('Enter')
        }
        await new Promise((resolve) => setTimeout(resolve, 4000))
        expect(await page.getByTestId(testIds.status)).toBeVisible()
        expect(await page.getByTestId(testIds.status)).toHaveText('Better luck next time!')
        expect(await page.locator('#app').screenshot({ animations: 'disabled' })).toMatchSnapshot(
            'game-lost.png'
        )
    })

    test('Game should end with success message when correct word is entered', async ({ page }) => {
        await page.keyboard.type(correctWord)
        await page.keyboard.press('Enter')
        await new Promise((resolve) => setTimeout(resolve, 4000))
        expect(await page.getByTestId(testIds.status)).toBeVisible()
        expect(await page.getByTestId(testIds.status)).toHaveText('You Won!')
        expect(await page.locator('#app').screenshot({ animations: 'disabled' })).toMatchSnapshot(
            'game-won.png'
        )
    })
})

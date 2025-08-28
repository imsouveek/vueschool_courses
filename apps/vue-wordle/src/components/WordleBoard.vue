<script setup lang="ts">
import GuessInput from '@/components/GuessInput.vue'
import GuessView from '@/components/GuessView.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessKeyboard from './GuessKeyboard.vue'
import { useWordleGame } from '@/composables/useWordleGame'

const props = defineProps({
    wordOfTheDay: {
        type: String,
        required: true,
        validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
})

const { guessesSubmitted, isGameOver, pendingAttempts, guessFeedback, setWordOfTheDay } =
    useWordleGame()
setWordOfTheDay(props.wordOfTheDay)
</script>

<template>
    <div class="max-w-4xl mx-auto py-8">
        <div v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
            <guess-view :guess="guess" :guess-feedback="guessFeedback[index]" />
        </div>
        <guess-input v-if="!isGameOver" />
        <div v-for="index in pendingAttempts" :key="`${index}`">
            <guess-view />
        </div>
        <Transition name="slide-down">
            <p v-if="isGameOver" class="mt-16 text-amber-900 text-4xl font-bold text-center" data-test="game-status">
                {{ guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
            </p>
        </Transition>
        <guess-keyboard :class="{ 'mt-42': !isGameOver }" />
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.slide-down-enter-active,
.slide-down-leave-active {
    @apply transition-all duration-300 delay-1500;
}

.slide-down-enter-from,
.slide-down-leave-to {
    @apply opacity-0 -translate-y-40;
}

.slide-down-enter-to,
.slide-down-leave-from {
    @apply opacity-100 translate-y-0;
}
</style>

<script setup lang="ts">
import GuessInput from '@/components/GuessInput.vue'
import GuessView from '@/components/GuessView.vue'
import { MAX_GUESS_COUNT, DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { Transition, computed, ref } from 'vue'

const props = defineProps({
    wordOfTheDay: {
        type: String,
        required: true,
        validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
})

const guessesSubmitted = ref<string[]>([])
const isGameOver = computed(() => guessesSubmitted.value.length === MAX_GUESS_COUNT || guessesSubmitted.value.includes(props.wordOfTheDay))
const pendingAttempts = computed(() => MAX_GUESS_COUNT - guessesSubmitted.value.length - (isGameOver.value ? 0 : 1))
</script>

<template>
    <div class="max-w-4xl mx-auto py-8">
        <ul>
            <li v-for="(guess, index) in guessesSubmitted" :key="`${index}-${guess}`">
                <span class="guess hidden">{{ guess }}</span>
                <guess-view :guess="guess" past :flip-letters="index === guessesSubmitted.length - 1" />
            </li>
        </ul>
        <guess-input v-if="!isGameOver" @guess-submitted="(guess) => guessesSubmitted.push(guess)" />
        <ul>
            <li v-for="(index) in pendingAttempts" :key="`${index}`">
                <span class="guess hidden" />
                <guess-view />
            </li>
        </ul>
        <Transition name="slide-down">
            <p v-if="isGameOver" v-text="guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
                class="mt-16 text-amber-900 text-4xl font-bold text-center " />
        </Transition>
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

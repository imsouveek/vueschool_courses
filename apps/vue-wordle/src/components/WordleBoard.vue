<script setup lang="ts">
import GuessInput from '@/components/GuessInput.vue'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { ref } from 'vue'

defineProps({
    wordOfTheDay: {
        type: String,
        validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
})

const guessSubmitted = ref('')
</script>

<template>
    <div class="max-w-4xl mx-auto py-8">
        <guess-input @guess-submitted="(guess) => (guessSubmitted = guess)" />
        <p
            v-if="guessSubmitted"
            v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
            class="mt-16 text-amber-900 text-2xl text-center"
        />
    </div>
</template>

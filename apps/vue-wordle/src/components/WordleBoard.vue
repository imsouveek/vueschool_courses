<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref } from 'vue';

defineProps({
    wordOfTheDay: {
        type: String,
        validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

const formattedGuessInProgress = computed({
    get: () => guessInProgress.value,
    set: (value) => {
        guessInProgress.value = value.slice(0, WORD_SIZE).toUpperCase().replace(/[^A-Z]/g, '')
    }
})

const onSubmit = () => {
    if (!englishWords.includes(guessInProgress.value)) {
        return
    }
    guessSubmitted.value = guessInProgress.value
}
</script>

<template>
    <input type="text" v-model="formattedGuessInProgress" @keydown.enter="onSubmit" maxlength="5" />
    <p v-if="guessSubmitted" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />
</template>

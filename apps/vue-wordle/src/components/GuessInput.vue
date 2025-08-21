<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { ref } from 'vue'
import GuessView from './GuessView.vue';

const emit = defineEmits<{
    'guess-submitted': [guess: string]
}>()

const guessInProgress = ref('')
const errorAnimation = ref(false)

const handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement
    guessInProgress.value = target.value
        .substring(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, '')
    target.value = guessInProgress.value
}


const onSubmit = async () => {
    if (!englishWords.includes(guessInProgress.value)) {
        errorAnimation.value = true
        await new Promise((resolve) => setTimeout(resolve, 300))
        errorAnimation.value = false
        return
    }
    emit('guess-submitted', guessInProgress.value)
    guessInProgress.value = ''
}
</script>

<template>
    <div class="flex" :class="{ 'animate-shake': errorAnimation }">
        <input type="text" v-model="guessInProgress" autofocus @keydown.enter="onSubmit"
            @blur="({ target }) => (target as HTMLInputElement).focus()" maxlength="5" @input="handleInput"
            class="opacity-0 cursor-default w-0" />
        <guess-view :guess="guessInProgress" animate />
    </div>
</template>

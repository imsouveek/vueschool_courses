<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import GuessView from './GuessView.vue'
import { useWordleGame } from '@/composables/useWordleGame'

const { guessInProgress, invalidWordError, processInput, handleSubmit } = useWordleGame()

const onInput = (event: Event): void => {
    const target = event.target as HTMLInputElement
    processInput(target.value)
    target.value = guessInProgress.value
}

const onKeypress = (event: KeyboardEvent) => {
    const key = event.key
    if (/^[a-zA-Z]$/.test(key) || key === 'Backspace') {
        return
    }

    if (key === 'Enter') {
        handleSubmit()
        return
    }

    event.preventDefault()
}
</script>

<template>
    <div class="flex" :class="{ 'animate-shake': invalidWordError }">
        <input
            type="text"
            v-model="guessInProgress"
            autofocus
            @keydown="onKeypress"
            @cut.prevent
            @copy.prevent
            @paste.prevent
            @blur="({ target }) => (target as HTMLInputElement).focus()"
            :maxlength="WORD_SIZE"
            @input="onInput"
            class="opacity-0 cursor-default w-0"
            data-test="guess-input"
        />
        <guess-view :guess="guessInProgress" />
    </div>
</template>

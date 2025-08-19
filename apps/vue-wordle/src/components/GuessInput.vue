<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { computed, ref } from 'vue'

const emit = defineEmits<{
    'guess-submitted': [guess: string]
}>()

const guessInProgress = ref('')

const handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement
    guessInProgress.value = target.value
        .substring(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, '')
    target.value = guessInProgress.value
}

const inputPosition = computed(() => guessInProgress.value.length)

const onSubmit = () => {
    if (!englishWords.includes(guessInProgress.value)) {
        return
    }
    emit('guess-submitted', guessInProgress.value)
}
</script>

<template>
    <input
        type="text"
        v-model="guessInProgress"
        autofocus
        @keydown.enter="onSubmit"
        @blur="({ target }) => (target as HTMLInputElement).focus()"
        maxlength="5"
        @input="handleInput"
        class="opacity-0 cursor-default"
    />
    <div class="grid grid-cols-5 max-w-80 mx-auto gap-1">
        <div
            v-for="i in 5"
            :key="i"
            class="flex flex-col items-center justify-center text-5xl border-1 border-amber-900 rounded w-15 h-15 bg-amber-100 text-amber-900"
            :class="{ 'animate-pop': i === inputPosition }"
        >
            {{ guessInProgress.charAt(i - 1) }}
        </div>
    </div>
</template>

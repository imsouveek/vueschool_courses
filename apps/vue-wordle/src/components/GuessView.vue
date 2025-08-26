<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { WORD_SIZE, type Feedback } from '@/settings';
import WordleLetter from './WordleLetter.vue';

const props = withDefaults(defineProps<{
    guess?: string,
    guessFeedback?: ReadonlyArray<Feedback>
}>(), {
    guess: ''
})

const inputPosition = computed(() => props.guess.length)
const flip = ref<boolean[]>(Array(WORD_SIZE))
const isPastGuess = computed(() => !!props.guessFeedback)

onMounted(async () => {
    if (!isPastGuess.value) {
        return
    }

    for (let i = 0; i < WORD_SIZE; ++i) {
        flip.value[i] = true
        await new Promise((resolve) => setTimeout(resolve, 300))
    }
})
</script>

<template>
    <div class="grid grid-cols-5 w-fit mx-auto gap-2 mb-2" :data-test="`word-${isPastGuess ? guess : ''}`">
        <wordle-letter v-for="i in WORD_SIZE" :key="i" :letter="guess.charAt(i - 1)"
            :feedback="flip[i - 1] ? guessFeedback?.[i - 1] : null"
            :class="[{ 'animate-pop': i === inputPosition && !isPastGuess }]" />
    </div>
</template>

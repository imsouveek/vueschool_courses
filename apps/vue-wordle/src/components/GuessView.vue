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

enum flipStatus {
    New,
    InProgress,
    HalfDone,
    Done
}

const inputPosition = computed(() => props.guess.length)
const flip = ref<flipStatus[]>(Array.from({ length: WORD_SIZE }, () => flipStatus.New))
const isPastGuess = computed(() => !!props.guessFeedback)

onMounted(async () => {
    if (!isPastGuess.value) {
        return
    }

    for (let i = 0; i < WORD_SIZE; ++i) {
        flip.value[i] = flipStatus.InProgress
        await new Promise((resolve) => setTimeout(resolve, 300))
        flip.value[i] = flipStatus.HalfDone
        setTimeout(() => flip.value[i] = flipStatus.Done, 300)
    }
})
</script>

<template>
    <div class="grid grid-cols-5 w-fit mx-auto gap-2 mb-2">
        <wordle-letter v-for="i in WORD_SIZE" :key="i" :letter="guess.charAt(i - 1)" :feedback="guessFeedback?.[i - 1]"
            :hideFeedback="flip[i - 1] < flipStatus.HalfDone"
            :class="[{ 'animate-pop': i === inputPosition && !isPastGuess },
            { 'animate-[simple-flip_.6s_ease-in-out]': flip[i - 1] === flipStatus.InProgress || flip[i - 1] === flipStatus.HalfDone }]" />
    </div>
</template>

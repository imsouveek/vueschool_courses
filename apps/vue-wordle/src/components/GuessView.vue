<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { WORD_SIZE } from '@/settings';

const props = withDefaults(defineProps<{
    guess?: string,
    animate?: boolean,
    past?: boolean,
    flipLetters?: boolean
}>(), {
    guess: '',
    animate: false,
    past: false,
    flipLetters: false
})

enum flipStatus {
    New,
    InProgress,
    Done
}

const inputPosition = computed(() => props.guess.length)
const flip = ref<flipStatus[]>(Array.from({ length: WORD_SIZE }, () => flipStatus.New))

onMounted(async () => {
    if (!props.flipLetters) {
        return
    }

    for (let i = 1; i <= WORD_SIZE; ++i) {
        flip.value[i] = flipStatus.InProgress
        await new Promise((resolve) => setTimeout(resolve, 300))
        flip.value[i] = flipStatus.Done
    }
})
</script>

<template>
    <div class="grid grid-cols-5 max-w-80 mx-auto gap-4 mb-2">
        <div v-for="i in WORD_SIZE" :key="i" class="relative text-5xl w-15 h-15"
            :class="{ 'animate-pop z-10': i === inputPosition && animate }">
            <div class="backface-hidden absolute flex flex-col items-center justify-center border-1 rounded left-0 right-0 top-0 bottom-0 border-slate-900 bg-slate-100 text-slate-900 "
                :class="[{ 'animate-frontface-flip': flip[i] === flipStatus.InProgress }, { '-rotate-y-180': past && flip[i] === flipStatus.Done }, { 'rotate-y-0': !past || flip[i] !== flipStatus.Done }]">
                {{ guess.charAt(i - 1) }}
            </div>
            <div class="backface-hidden absolute flex flex-col items-center justify-center border-1 rounded left-0 right-0 top-0 bottom-0 border-green-600 bg-green-600 text-white"
                :class="[{ 'animate-backface-flip': flip[i] === flipStatus.InProgress }, { 'rotate-y-0': past && flip[i] === flipStatus.Done }, { 'rotate-y-180': !past || flip[i] !== flipStatus.Done }]">
                {{ guess.charAt(i - 1) }}
            </div>
        </div>
    </div>
</template>

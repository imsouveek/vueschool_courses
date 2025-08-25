<script setup lang="ts">
import { useWordleGame } from '@/composables/useWordleGame';
import type { Feedback } from '@/settings';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    letter: string,
    feedback?: Feedback | null,
    enableClick?: boolean,
    hideFeedback?: boolean
}>()

const { handleKeyPress } = useWordleGame()

const styleClasses = ref('border-slate-900 bg-slate-100 text-slate-900')
watchEffect(() => {
    if (props.hideFeedback) return
    switch (props.feedback) {
        case 'correct':
            styleClasses.value = 'border-green-600 bg-green-600 text-slate-100'
            break
        case 'almost':
            styleClasses.value = 'border-amber-600 bg-amber-600 text-slate-100'
            break
        case 'incorrect':
            styleClasses.value = 'border-slate-600 bg-slate-600 text-slate-100'
            break
    }
    return
})

const triggerEvent = () => {
    if (props.enableClick) {
        handleKeyPress(props.letter)
    }
}

</script>

<template>
    <div class="flex flex-col items-center justify-center border-1 rounded  text-3xl min-w-10 min-h-10"
        :class="[styleClasses, { 'cursor-pointer hover:animate-bounce': enableClick }]" @click.stop="triggerEvent">
        {{ letter }}
    </div>
</template>

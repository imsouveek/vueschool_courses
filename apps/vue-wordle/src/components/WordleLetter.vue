<script setup lang="ts">
import { useWordleGame } from '@/composables/useWordleGame';
import type { Feedback } from '@/settings';
import { ref, watchEffect } from 'vue';
import { Icon } from '@iconify/vue'

const props = defineProps<{
    letter: string,
    feedback?: Feedback | null,
    enableClick?: boolean,
}>()

const { handleKeyPress } = useWordleGame()

const styleClasses = ref('border-slate-900 bg-slate-100 text-slate-900')
watchEffect(() => {
    let newStyles: string
    switch (props.feedback) {
        case 'correct':
            newStyles = 'border-green-600 bg-green-600 text-slate-100'
            break
        case 'almost':
            newStyles = 'border-amber-600 bg-amber-600 text-slate-100'
            break
        case 'incorrect':
            newStyles = 'border-slate-600 bg-slate-600 text-slate-100'
            break
        default:
            newStyles = 'border-slate-900 bg-slate-100 text-slate-900'
            break
    }
    setTimeout(() => {
        styleClasses.value = newStyles
    }, 300)
    return
})

const triggerEvent = () => {
    if (props.enableClick) {
        handleKeyPress(props.letter)
    }
}

</script>

<template>
    <div class="flex flex-col items-center justify-center border-1 rounded  text-3xl min-w-10 min-h-10" :class="[
        styleClasses,
        { 'cursor-pointer hover:scale-125 transition-transform duration-300': enableClick },
        { 'animate-[simple-flip_.6s_ease-in-out]': feedback }
    ]" @click.stop="triggerEvent" :data-test="`letter-${letter}`" :aria-label="feedback ?? 'nofeedback'">
        <span v-if="letter === 'backspace'">
            <Icon icon="material-symbols:backspace" width="36" height="36" />
        </span>
        <span v-else-if="letter === 'enter'">
            <Icon icon="ant-design:enter-outlined" width="36" height="36" />
        </span>
        <span v-else>{{ letter }}</span>
    </div>
</template>

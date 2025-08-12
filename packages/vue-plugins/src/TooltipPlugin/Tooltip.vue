<script setup lang="ts">
import tippy, { type Instance, type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { inject, onMounted, onUnmounted, onUpdated, useTemplateRef, type ShallowRef } from 'vue';
import { tooltipOptionsInject } from '.';

const tooltip = useTemplateRef('tooltip') as ShallowRef<HTMLElement>
const props = defineProps<{
    text: string,
    options?: Partial<Props>
}>()

let tippyInstance: Instance | null = null

const initTippy = () => {
    if (tippyInstance) {
        tippyInstance.destroy()
    }
    tippyInstance = tippy(tooltip.value?.parentNode as HTMLElement, {
        ...inject(tooltipOptionsInject),
        content: props.text,
        ...props.options
    })
}
onMounted(initTippy)
onUpdated(initTippy)

onUnmounted(() => {
    if (tippyInstance) {
        tippyInstance.destroy()
    }
})
</script>

<template>
    <span ref="tooltip"></span>
</template>

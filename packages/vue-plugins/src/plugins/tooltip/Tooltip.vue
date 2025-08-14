<script setup lang="ts">
import tippy, { type Instance } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { inject, onMounted, onUnmounted, watch, unref, ref } from 'vue'
import { tooltipOptionsInject } from '.'
import type { TooltipPluginProps } from './types'

const tooltip = ref<HTMLElement>()
const props = defineProps<{
    text: string
    options?: TooltipPluginProps
}>()

const globalOptions = inject<TooltipPluginProps>(tooltipOptionsInject, {})
let tippyInstance: Instance | null = null

const initTippy = () => {
    const target = unref(tooltip.value?.parentElement)
    if (!target) return

    const content = String(props.text)
    if (tippyInstance) {
        tippyInstance.setProps({
            content,
            ...props.options
        })
    } else {
        tippyInstance = tippy(target, {
            ...globalOptions,
            content,
            ...props.options
        })
    }
}

onMounted(initTippy)

watch(
    () => [props.text, props.options],
    () => initTippy(),
    { deep: true }
)

onUnmounted(() => tippyInstance?.destroy())
</script>

<template>
    <span ref="tooltip"></span>
</template>

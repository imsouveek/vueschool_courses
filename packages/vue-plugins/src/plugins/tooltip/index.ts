import { defineAsyncComponent, type App } from 'vue'
import defu from 'defu'
import { hideAll } from 'tippy.js'
import type { TooltipPluginProps } from './types'

export const tooltipOptionsInject = Symbol()

export function createToolTip(options: TooltipPluginProps) {
    return (app: App) => {
        options = defu(options, {
            arrow: true
        })

        app.config.globalProperties.$hideAllTooltips = hideAll

        app.provide(tooltipOptionsInject, options)
        app.component(
            'Tooltip',
            defineAsyncComponent(() => import('@/plugins/tooltip/Tooltip.vue'))
        )
    }
}

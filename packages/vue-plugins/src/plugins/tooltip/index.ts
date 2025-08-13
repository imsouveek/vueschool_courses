import { defineAsyncComponent, type App } from 'vue'
import defu from 'defu'
import { hideAll, type Props } from 'tippy.js'

export const tooltipOptionsInject = Symbol()

export type TooltipPluginProps = Partial<Props>

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

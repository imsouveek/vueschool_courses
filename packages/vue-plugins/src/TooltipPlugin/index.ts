import { defineAsyncComponent, type App } from 'vue'
import type { TooltipPluginOptions } from '@/types/TooltipPluginOptions'

export function TooltipPlugin(app: App<Element>, options: TooltipPluginOptions) {
    app.component(
        'Tooltip',
        defineAsyncComponent(() => import('@/TooltipPlugin/Tooltip.vue'))
    )
    console.log('Hello World', options)
}

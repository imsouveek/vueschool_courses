import type { HideAll, Props } from 'tippy.js'
import type Tooltip from './Tooltip.vue'
export * from '../index'

export type TooltipPluginProps = Partial<Props>

declare module 'vue' {
    interface ComponentCustomProperties {
        $hideAllTooltips: HideAll
    }
    interface GlobalComponents {
        Tooltip: typeof Tooltip
    }
}

export {}

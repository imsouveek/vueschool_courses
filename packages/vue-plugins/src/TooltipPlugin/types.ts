import type { HideAll } from 'tippy.js'
import type Tooltip from './Tooltip.vue'
export * from './index'

declare module 'vue' {
    interface ComponentCustomProperties {
        $hideAllTooltips: HideAll
    }
    interface GlobalComponents {
        Tooltip: typeof Tooltip
    }
}

export {}

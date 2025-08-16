<script setup lang="ts">
import AppButton from '@/components/base/AppButton.vue'
import AppHeading from '@/components/base/AppHeading.vue'
import AppInput from '@/components/base/AppInput.vue'
import { inject, ref } from 'vue'
import { DarkModeInjectionKey } from '@/types/DarkModeInjectionKey'

const tooltipText = ref('Hello World')
const isDark = inject(DarkModeInjectionKey)
</script>

<template>
    <app-heading>Custom Vue.JS 3 Plugins</app-heading>
    <app-input label="Enter Tooltip Text" v-model="tooltipText" />
    <br />
    <div class="flex flex-row justify-between">
        <div>
            <span class="w-16"
                >Click on me
                <Tooltip
                    :text="tooltipText"
                    :options="{
                        theme: isDark ? 'dark' : 'light',
                        placement: 'top',
                        hideOnClick: false,
                        trigger: 'click',
                        arrow: false
                    }"
                />
            </span>
            <span
                >And me
                <Tooltip
                    :text="tooltipText"
                    :options="{
                        theme: isDark ? 'dark' : 'light',
                        placement: 'right',
                        hideOnClick: false,
                        trigger: 'click'
                    }"
                />
            </span>
            <br />
        </div>
        <app-button @click="$hideAllTooltips()">Clear Tooltips</app-button>
    </div>
</template>

<!-- Note that below style cannot be scoped -->
<style>
@reference 'tailwindcss';

.tippy-box[data-theme~='light'] {
    @apply bg-amber-800 text-amber-50;
}

.tippy-box[data-theme~='dark'] {
    @apply bg-amber-200 text-amber-950;
}

.tippy-box[data-theme~='light'][data-placement^='top'] > .tippy-arrow::before {
    @apply border-t-amber-800;
}

.tippy-box[data-theme~='light'][data-placement^='bottom'] > .tippy-arrow::before {
    @apply border-b-amber-800;
}

.tippy-box[data-theme~='light'][data-placement^='left'] > .tippy-arrow::before {
    @apply border-l-amber-800;
}

.tippy-box[data-theme~='light'][data-placement^='right'] > .tippy-arrow::before {
    @apply border-r-amber-800;
}

.tippy-box[data-theme~='dark'][data-placement^='top'] > .tippy-arrow::before {
    @apply border-t-amber-200;
}

.tippy-box[data-theme~='dark'][data-placement^='bottom'] > .tippy-arrow::before {
    @apply border-b-amber-200;
}

.tippy-box[data-theme~='dark'][data-placement^='left'] > .tippy-arrow::before {
    @apply border-l-amber-200;
}

.tippy-box[data-theme~='dark'][data-placement^='right'] > .tippy-arrow::before {
    @apply border-r-amber-200;
}
</style>

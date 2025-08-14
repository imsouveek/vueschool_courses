<script setup lang="ts">
import AppButton from '@/components/base/AppButton.vue'
import AppHeading from '@/components/base/AppHeading.vue'
import AppInput from '@/components/base/AppInput.vue'
import { ref } from 'vue'

const tooltipText = ref('Hello World')
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
                    :options="{ placement: 'right', hideOnClick: false, trigger: 'click' }"
                />
            </span>
            <br />
        </div>
        <app-button @click="$hideAllTooltips()">Clear Tooltips</app-button>
    </div>
</template>

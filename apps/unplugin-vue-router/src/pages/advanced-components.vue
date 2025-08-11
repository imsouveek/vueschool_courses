<script setup lang="ts">
import ClickCounter from '@/components/ClickCounter.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import AppButton from '@/components/base/AppButton.vue'
import AppHeading from '@/components/base/AppHeading.vue'
import AppModal from '@/components/base/AppModal.vue'

import { useTemplateRef } from 'vue'
const modalRef = useTemplateRef('modal')
</script>

<template>
    <div>
        <app-heading>Advanced Components</app-heading>
        <div>
            <h1 class="text-xl mt-4 mb-8">Define Expose</h1>
            <app-button @click="modalRef?.open">External Open</app-button>
            <app-modal ref="modal">
                <h2 class="text-2xl pb-8">Hello</h2>
                <div class="pb-20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula nisl
                    in interdum dapibus. Duis interdum, enim ut gravida tincidunt, tortor ligula
                    ultricies felis, pharetra cursus turpis urna at orci. Cras dictum mollis eros, a
                    laoreet libero. Donec purus odio, tempus in volutpat a, tincidunt a metus.
                    Vivamus et tempus eros. Vestibulum tempus fringilla libero vitae euismod. Ut
                    ultricies quis metus tincidunt fringilla. Phasellus porta pretium vulputate.
                    Nullam blandit auctor leo, id luctus est tincidunt quis. Cras imperdiet, leo vel
                    posuere consectetur, quam leo sollicitudin enim, nec lacinia libero sapien non
                    metus. Aenean gravida aliquet dui, commodo porttitor turpis pharetra sed.
                </div>
            </app-modal>
        </div>
        <div>
            <h1 class="text-xl mt-4 mb-8">Default Slot</h1>
            <click-counter #default="{ increment }">
                <app-button @click="increment">Click Me!</app-button>
            </click-counter>
        </div>
        <div>
            <h1 class="text-xl mt-4 mb-8">Error Boundary</h1>
            <error-boundary>
                <error-component />
                <template #error="{ error, clearError }">
                    <div class="p-8 rounded-xl border-dashed border-[2px] border-amber-900">
                        <p class="pb-4">{{ error }}</p>
                        <app-button @click="clearError">Clear Error</app-button>
                    </div>
                </template>
            </error-boundary>
        </div>
    </div>
</template>

<style scoped>
.green {
    color: green;
}
</style>

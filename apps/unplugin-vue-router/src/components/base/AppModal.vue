<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/base/AppButton.vue'

const isOpen = ref(false)
const open = () => (isOpen.value = true)
const close = () => (isOpen.value = false)

defineExpose({
    open
})
</script>

<template>
    <div v-show="isOpen">
        <div
            class="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-dvw h-dvh bg-amber-950 dark:bg-amber-50 opacity-50"
            @click="close"
        ></div>
        <div
            class="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-amber-50 dark:bg-amber-950 w-11/12 md:w-3xl min-h-1/12 rounded-xl opacity-100 p-8"
        >
            <slot></slot>
            <app-button class="absolute left-[50%] bottom-12 translate-x-[-50%]" @click="close">
                Close Modal
            </app-button>
        </div>
    </div>
</template>

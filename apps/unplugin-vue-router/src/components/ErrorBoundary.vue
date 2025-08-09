<script setup lang="ts">
import { computed, onErrorCaptured, ref } from 'vue'

const error = ref()
const success = 'Success'
onErrorCaptured((err) => {
    error.value = err
})

const clearError = () => {
    error.value = null
}

const slotName = computed(() => (error.value ? 'error' : 'default'))
const slotprops = computed(() => {
    if (!error.value) return { success }
    return { error, clearError }
})
</script>

<template>
    <slot :name="slotName" v-bind="slotprops"></slot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps<{
    label?: string
}>()

const modelValue = defineModel()
const isAddToWallet = ref(false)
</script>
<template>
    <label class="block mb-3">
        <span
            v-if="label"
            class="after:content-['*'] after:text-red-500 block text-2xl text-gray-800 dark:text-white"
            >{{ label }}</span
        >
        <input
            v-model="modelValue"
            type="text"
            required="true"
            placeholder="sobo123"
            class="placeholder:italic placeholder:text-sm block w-full p-3 border border-gray-400 rounded-lg focus:outline-lime-600 disabled:opacity-50 invalid:border-red-600"
        />
    </label>
</template>

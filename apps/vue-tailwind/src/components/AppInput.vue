<script setup lang="ts">
const props = defineProps<{
    label?: string
    required?: boolean
}>()

const modelValue = defineModel()
</script>
<template>
    <label class="block mb-3">
        <span v-if="props.label" :class="[' block text-slate-800 dark:text-white', { 'required': required }]">
            {{ props.label }}
        </span>
        <input v-model="modelValue" type="text" :required="required" placeholder="sobo123"
            class="placeholder:italic placeholder:text-sm block w-full p-3 border border-gray-400 rounded-lg focus:outline-lime-600 disabled:opacity-50 invalid:border-red-600 dark:bg-slate-700" />
    </label>
</template>

<style scoped>
@reference "tailwindcss";

.required {
    @apply after:content-['*'] after:text-red-500;
}
</style>

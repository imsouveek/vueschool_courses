<script setup lang="ts">
const props = defineProps<{
    label?: string
    required?: boolean
}>()

const modelValue = defineModel()
</script>
<template>
    <label class="block mb-3">
        <span v-if="props.label" :class="[' block mb-1', { required: required }]">
            {{ props.label }}
        </span>
        <input
            v-model="modelValue"
            type="text"
            :required="required"
            placeholder="sobo123"
            class="placeholder:italic placeholder:text-sm placeholder:text-amber-800 dark:placeholder:text-amber-600 block w-full p-3 border focus:border-[2px] rounded-lg focus:outline-amber-600 disabled:opacity-50 invalid:border-red-600 bg-transparent border-amber-950 dark:border-amber-50 focus:ring-0"
        />
    </label>
</template>

<style scoped>
@reference "tailwindcss";

.required {
    @apply after:content-['*'] after:text-red-500;
}
</style>

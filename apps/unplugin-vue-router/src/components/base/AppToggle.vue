<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
    <label class="p-2 flex gap-2 items-center group">
        <span class="select-none">
            <slot></slot>
        </span>
        <input type="checkbox" v-model="modelValue" class="hidden" />
        <span
            class="rounded m-2 w-5 h-2 inline-block relative"
            :class="[{ 'bg-gray-400': !modelValue }, { 'bg-amber-400': modelValue }]"
        >
            <span
                class="absolute top-[50%] translate-y-[-50%] rounded-full w-4 h-4 inline-block shadow-gray-500 dark:shadow-none shadow-md"
                :class="[
                    { 'left-0 bg-gray-200 translate-x-[-50%]': !modelValue },
                    { 'right-0 bg-amber-700 translate-x-[50%]': modelValue }
                ]"
            >
            </span>
        </span>
    </label>
</template>

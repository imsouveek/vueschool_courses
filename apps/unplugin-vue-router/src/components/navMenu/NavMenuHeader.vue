<script setup lang="ts">
const emit = defineEmits(['toggleMenu'])
</script>

<template>
    <div class="flex gap-2 items-center">
        <button class="sm:hidden flex flex-col gap-1" @click="emit('toggleMenu')">
            <span class="inline-block w-6 h-[2px] bg-amber-700"></span>
            <span class="inline-block w-6 h-[2px] bg-amber-700"></span>
            <span class="inline-block w-6 h-[2px] bg-amber-700"></span>
        </button>
        <h1 class="text-4xl font-extralight mb-2 sm:mb-8">
            <slot></slot>
        </h1>
    </div>
</template>

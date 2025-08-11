<script setup lang="ts">
defineProps<{
    isSmallScreen: boolean
}>()

const isMobileMenuActive = defineModel()
</script>

<template>
    <div
        class="absolute sm:hidden top-full left-0 w-dvw h-dvh bg-amber-950 dark:bg-amber-50 opacity-50"
        v-if="isMobileMenuActive"
        @click="isMobileMenuActive = false"
    ></div>
    <div
        class="absolute sm:static top-full left-0 bg-amber-50 dark:bg-amber-950 rounded translate-x-2 translate-y-2"
        v-if="isMobileMenuActive || !isSmallScreen"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'

defineProps<{
    to: RouteLocationNormalized
    name: string
    image: string
    navKey: string
}>()
</script>

<template>
    <router-link
        :to="to"
        :key="navKey"
        class="flex flex-col-reverse text-center rounded-xl border-[1px] border-amber-700 dark:border-amber-400 bg-amber-400 dark:bg-amber-700 hover:bg-amber-500 dark:hover:bg-amber-600 object-contain overflow-hidden"
    >
        <h2 class="text-xs py-1">{{ name }}</h2>
        <img :src="`/images/${image}`" :alt="name" class="object-contain overflow-hidden" />
    </router-link>
</template>

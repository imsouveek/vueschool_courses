<script lang="ts">
import { experienceDetails } from '@/loaders/experienceBySlug'
export { experienceDetails }
</script>

<script setup lang="ts">
const { data: details } = experienceDetails()
</script>

<template>
    <section class="border-t-[1px] pt-4 mt-4">
        <h1 class="text-xl mb-4">{{ details?.name }}</h1>
        <div class="flex flex-col items-center">
            <img
                :src="`/images/${details?.image}`"
                :alt="details?.name"
                class="w-64 rounded-xl border-[1px] border-amber-700 dark:border-amber-400"
            />
            <p class="text-sm text-justify mt-4">{{ details?.description }}</p>
        </div>
    </section>
</template>

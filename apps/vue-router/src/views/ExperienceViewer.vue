<script setup lang="ts">
import sourceData from '@/data.json'
import type Destination from '@/types/Destination';
import type Experience from '@/types/Experience';
import { computed } from 'vue';

const props = defineProps<{
    id: number,
    slug: string,
    experienceSlug: string
}>()
const destination = computed<Destination | undefined>(() => sourceData.destinations.find((destination: Destination) => destination.id === props.id))
const experience = computed<Experience | undefined>(() => destination?.value?.experiences.find((experience: Experience) => experience?.slug === props.experienceSlug))
</script>

<template>
    <section>
        <h1>{{ experience?.name }}</h1>
        <img :src="`/images/${experience?.image}`" :alt="experience?.name">
        <p>{{ experience?.description }}</p>
    </section>
</template>

<script setup lang="ts">
import { computed, Suspense } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import sourceData from '@/data.json'
import type Destination from '@/types/Destination'
import ExperienceCard from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'

const props = defineProps<{
    id: number
    slug: string
}>()

const destination = computed<Destination | undefined>(() =>
    sourceData.destinations.find((destination: Destination) => destination.id === props.id)
)
</script>

<template>
    <div>
        <section class="destination">
            <h1>{{ destination?.name }}</h1>
            <go-back />
            <div class="destination-details">
                <img :src="`/images/${destination?.image}`" :alt="destination?.name" />
                <p>{{ destination?.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top experiences in {{ destination?.name }}</h2>
            <div class="cards">
                <router-link
                    v-for="experience in destination?.experiences"
                    :key="experience.slug"
                    :to="{ name: 'experience.viewer', params: { experienceSlug: experience.slug } }"
                >
                    <experience-card :experience="experience" />
                </router-link>
            </div>
        </section>
        <Suspense>
            <router-view />
        </Suspense>
    </div>
</template>

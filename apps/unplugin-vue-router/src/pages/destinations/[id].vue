<script lang="ts">
import { destinationDetails } from '@/loaders/destinationById'
export { destinationDetails }
</script>

<script setup lang="ts">
import { RouterView, type RouteLocationNormalized } from 'vue-router'
import DestinationLink from '@/components/DestinationLink.vue'

const { data: details } = destinationDetails()
</script>

<template>
    <div>
        <section>
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
        <section class="my-4 py-4 border-t-[1px]">
            <h1 class="text-xl mb-4">Top experiences in {{ details?.name }}</h1>
            <div class="grid grid-cols-4 gap-4">
                <destination-link
                    v-for="experience in details?.experiences"
                    :key="experience.slug"
                    :nav-key="experience.slug"
                    :to="
                        {
                            name: '/destinations/[id]/experience/[slug]',
                            params: { id: String(details?.id), slug: experience.slug }
                        } as RouteLocationNormalized
                    "
                    :name="experience.name"
                    :image="experience?.image"
                />
            </div>
        </section>
        <router-view />
    </div>
</template>

<script lang="ts">
import { destinationsList } from '@/loaders/destinations'
export { destinationsList }
</script>

<script setup lang="ts">
import { RouterView, type RouteLocationNormalized } from 'vue-router'
import DestinationLink from '@/components/DestinationLink.vue'

const { data: destinations } = destinationsList()
</script>

<template>
    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
        <destination-link
            v-for="obj in destinations"
            :key="obj.id"
            :name="obj.name"
            :image="obj.image"
            :nav-key="String(obj.id)"
            :to="
                {
                    name: '/destinations/[id]',
                    params: { id: String(obj.id) }
                } as RouteLocationNormalized
            "
        />
        <router-view />
    </section>
</template>

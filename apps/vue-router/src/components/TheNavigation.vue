<script setup lang="ts">
import sourceData from '@/data.json'

const destinations = sourceData.destinations
</script>

<template>
    <div id="nav">
        <app-link id="logo" to="/">Vue School Travel App</app-link>
        <app-link v-for="destination in destinations" :key="destination.id"
            :to="{ name: 'destination.viewer', params: { id: destination.id, slug: destination.slug } }">
            {{ destination.name }}
        </app-link>
        <app-link :to="{ name: 'dashboard' }">Dashboard</app-link>
        <app-link to="https://vueschool.io">Vue School</app-link>
    </div>
</template>

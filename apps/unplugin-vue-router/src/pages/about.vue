<script setup lang="ts">
import AppHeading from '@/components/base/AppHeading.vue'
definePage({
    alias: ['/me'],
    meta: {
        requiresAuth: true
    }
})
</script>

<template>
    <div>
        <app-heading>About</app-heading>
    </div>
</template>

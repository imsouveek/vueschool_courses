<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/[...path]')
</script>

<template>
    <div>
        <p>404 Not Found</p>
        <p>{{ route.params.path }}</p>
    </div>
</template>

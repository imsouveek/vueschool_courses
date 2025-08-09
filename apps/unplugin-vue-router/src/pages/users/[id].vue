<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/users/[id]')
</script>

<template>
    <div>
        {{ route.params.id }}
    </div>
</template>

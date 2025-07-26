<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
let projectId: string
if ('id' in route.params) {
    projectId = route.params.id
}

</script>

<template>
    <div>
        <h1>Project {{ projectId }}</h1>
    </div>
</template>

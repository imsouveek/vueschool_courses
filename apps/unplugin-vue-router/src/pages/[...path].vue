<script setup lang="ts">
import AppHeading from '@/components/base/AppHeading.vue'
import { useRoute } from 'vue-router'

const route = useRoute('/[...path]')
let msg: string = ''
switch (route.params.path) {
    case 'no-destination':
        msg = 'Destination is not found'
        break
    case 'no-experience':
        msg = 'Experience is not found'
        break
    default:
        msg = 'Something went wrong'
        break
}
</script>

<template>
    <div>
        <app-heading>Error</app-heading>
        <div>{{ msg }}</div>
    </div>
</template>

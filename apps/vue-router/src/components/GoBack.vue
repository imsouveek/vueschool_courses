<script setup lang="ts">
import { useRouter } from 'vue-router'

// import router from '@/router'

const router = useRouter()
</script>

<template>
    <span class="go-back">
        <button @click="router.back()">Go Back</button>
    </span>
</template>

<script setup lang="ts">
import router from '@/router'
</script>

<template>
    <span class="go-back">
        <button @click="router.back()">Go Back</button>
    </span>
</template>

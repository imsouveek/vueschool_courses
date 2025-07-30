<script setup lang="ts">
import type Experience from '@/types/Experience';

defineProps<{
    experience: Experience
}>()
</script>

<template>
    <div class="card">
        <img :src="`/images/${experience?.image}`" :alt="experience?.name">
        <span class="card__text">
            {{ experience?.name }}
        </span>

    </div>
</template>

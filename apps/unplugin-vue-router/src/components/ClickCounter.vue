<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => ++count.value
</script>

<template>
    <div>
        <div class="text-2xl pb-4">{{ count }}</div>
        <slot :increment="increment"></slot>
    </div>
</template>

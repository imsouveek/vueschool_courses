<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
</script>

<template>
    <span>
        <button
            class="rounded p-1 cursor-pointer bg-amber-400 dark:bg-amber-700 hover:bg-amber-500 dark:hover:bg-amber-600"
            @click="router.back()"
        >
            <Icon icon="material-symbols:arrow-back-rounded" width="24" height="24" />
        </button>
    </span>
</template>

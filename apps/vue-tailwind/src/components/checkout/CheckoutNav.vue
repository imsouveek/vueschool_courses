<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(2)
const isActive = (n: number) => currentPage.value === n
</script>

<template>
    <div class="flex justify-between items-center">
        <ul class="flex text-xs text-slate-400 gap-2 items-center">
            <li @click="currentPage = 1" :class="{ active: isActive(1) }">Shipping</li>
            <li class="text-4xl">&middot;&middot;&middot;</li>
            <li @click="currentPage = 2" :class="{ active: isActive(2) }">Payment Method</li>
            <li class="text-4xl">&middot;&middot;&middot;</li>
            <li @click="currentPage = 3" :class="{ active: isActive(3) }">Confirmation</li>
        </ul>
        <button class="flex flex-col w-8 gap-1 p-2 rounded group">
            <span
                class="block w-full h-[2px] bg-white group-hover:scale-x-50 transition-all origin-left"
            ></span>
            <span
                class="block w-8/12 h-[2px] bg-white group-hover:scale-x-150 transition-all origin-left"
            ></span>
            <span
                class="block w-11/12 h-[2px] bg-white group-hover:scale-x-150 transition-all origin-left"
            ></span>
        </button>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.active {
    @apply text-green-600;
}
</style>

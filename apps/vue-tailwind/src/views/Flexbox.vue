<script setup lang="ts"></script>

<template>
    <section class="flex flex-wrap justify-center items-end gap-2">
        <div
            v-for="i in 15"
            :key="i"
            class="flex-shrink-0 p-4 text-center text-white bg-gray-500 w-14 h-14"
            :style="`height: ${i * 30 + 30}px`"
        >
            {{ i }}
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    price: number
    features: string[]
    name: string
    description: string
}>()
</script>
<template>
    <div
        class="border border-slate-600 rounded-md dark:bg-slate-800 p-4 text-center flex flex-col justify-between"
    >
        <div class="">
            <h3 class="text-xl font-semibold">{{ name }}</h3>
            <p class="text-slate-600 dark:text-slate-400 m-4 text-wrap">
                {{ description }}
            </p>
            <div>
                <span class="text-5xl font-black mr-2">${{ price }}</span>
                <span class="text-slate-600 dark:text-slate-400">/month</span>
            </div>
            <!-- List -->
            <ul role="list" class="mt-3">
                <li v-for="feature in features" :key="feature" class="flex gap-2 mb-2">
                    <!-- Icon -->
                    <svg
                        class="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span>{{ feature }}</span>
                </li>
            </ul>
        </div>
        <a href="#" class="bg-blue-600 px-4 py-2 block rounded text-white">Get started</a>
    </div>
</template>

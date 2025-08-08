<script setup lang="ts">
import { ref } from 'vue'

const imageSelect = ref(1)
</script>

<template>
    <div class="relative col-span-2">
        <img
            src=" /checkout-image.jpg"
            alt="Checkout"
            class="object-cover object-left w-full h-full rounded-tl-2xl rounded-bl-2xl"
        />

        <div class="absolute right-0 bottom-10">
            <div class="px-4 py-1 bg-green-600 translate-x-2/4">
                <span class="absolute right-[106%] top-[50%] translate-y-[-50%] text-slate-800"
                    >Total:
                </span>

                <div class="text-center">
                    <span class="text-xl font-black text-white">1,999.00</span>
                    <span class="block text-xs text-white">In stock | Free Shipping</span>
                </div>
            </div>
        </div>

        <div class="absolute flex flex-col left-6 bottom-10 gap-2">
            <div class="grid items-center justify-center">
                <input
                    id="imageSelect"
                    class="peer bg-transparent col-start-1 row-start-1 h-3 w-3 appearance-none rounded-full border border-slate-600 ring-transparent checked:border-white checked:bg-green-600"
                    type="radio"
                    value="1"
                    v-model="imageSelect"
                />
                <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    class="invisible col-start-1 row-start-1 stroke-green-600 peer-checked:visible text-green-600"
                >
                    <circle class="opacity-100" cx="7" cy="7" r="4" fill="currentColor" />
                </svg>
            </div>
            <div class="grid items-center justify-center">
                <input
                    id="imageSelect"
                    class="peer bg-transparent col-start-1 row-start-1 h-3 w-3 appearance-none rounded-full border border-slate-600 ring-transparent checked:border-white checked:bg-green-600 dark:checked:border-white"
                    type="radio"
                    value="2"
                    v-model="imageSelect"
                />
                <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    class="invisible col-start-1 row-start-1 stroke-green-600 peer-checked:visible text-green-600"
                >
                    <circle class="opacity-100" cx="7" cy="7" r="4" fill="currentColor" />
                </svg>
            </div>
            <div class="grid items-center justify-center">
                <input
                    id="imageSelect"
                    class="peer bg-transparent col-start-1 row-start-1 h-3 w-3 appearance-none rounded-full border border-slate-600 ring-transparent checked:border-white checked:bg-green-600 dark:checked:border-white"
                    type="radio"
                    value="3"
                    v-model="imageSelect"
                />
                <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    class="invisible col-start-1 row-start-1 stroke-green-600 peer-checked:visible text-green-600"
                >
                    <circle class="opacity-100" cx="7" cy="7" r="4" fill="currentColor" />
                </svg>
            </div>
        </div>
    </div>
</template>

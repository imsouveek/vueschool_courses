<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const thru = ref('')
const cardno = ref('')
const cvv = ref('')
const isAddToWallet = ref(false)
</script>

<template>
    <div class="grid grid-cols-4 gap-x-8 gap-y-6 pr-16 pt-6">
        <div class="col-span-3 flex flex-col-reverse gap-1">
            <label for="name" class="text-slate-400 text-xs">Card holder</label>
            <input
                type="text"
                id="name"
                v-model="name"
                class="form-input text-sm p-0 pb-1 bg-slate-800 border-0 border-b-[1px] border-white focus:ring-0 focus:border-b-2 focus:border-white"
            />
        </div>
        <div class="flex flex-col-reverse gap-1">
            <label for="mmyy" class="text-slate-400 text-xs">MM/YY</label>
            <input
                type="text"
                id="mmyy"
                v-model="thru"
                class="form-input text-sm p-0 pb-1 bg-slate-800 border-0 border-b-[1px] border-white focus:ring-0 focus:border-b-2 focus:border-white"
            />
        </div>
        <div class="col-span-3 flex flex-col-reverse gap-1">
            <label for="cardno" class="text-slate-400 text-xs">Card number</label>
            <input
                type="text"
                id="cardno"
                v-model="cardno"
                class="form-input text-sm p-0 pb-1 bg-slate-800 border-0 border-b-[1px] border-white focus:ring-0 focus:border-b-2 focus:border-white"
            />
        </div>
        <div class="flex flex-col-reverse gap-1">
            <label for="cvv" class="text-slate-400 text-xs">CVC</label>
            <input
                type="password"
                id="cvv"
                v-model="cvv"
                class="form-input text-sm p-0 pb-1 bg-slate-800 border-0 border-b-[1px] border-white focus:ring-0 focus:border-b-2 focus:border-white"
            />
        </div>

        <label
            for="checkbox_1"
            class="col-span-5 flex flex-row-reverse gap-3 text-xs pr-8 text-slate-400 select-none"
        >
            Add card to wallet
            <div class="grid items-center justify-center">
                <input
                    id="checkbox_1"
                    class="peer bg-slate-800 col-start-1 row-start-1 h-3 w-3 appearance-none rounded-full border border-green-600 ring-transparent checked:border-green-600 checked:bg-green-600 dark:border-gray-600 dark:checked:border-green-600"
                    type="checkbox"
                    v-model="isAddToWallet"
                />
                <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    class="invisible col-start-1 row-start-1 stroke-green-600 peer-checked:visible dark:text-green-600"
                >
                    <circle class="opacity-100" cx="7" cy="7" r="4" fill="currentColor" />
                </svg>
            </div>
        </label>
    </div>
</template>

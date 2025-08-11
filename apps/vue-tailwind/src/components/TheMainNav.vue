<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const active = ref(false)
const mobileMenuActive = ref(false)

const style = getComputedStyle(document.querySelector('body') as Element)
const smallScreenSize = style.getPropertyValue('--breakpoint-sm')
const isSmallScreen = ref(false)
const mediaQuery = window.matchMedia(`(max-width: ${smallScreenSize})`)

mediaQuery.onchange = (event) => {
    if (event.matches) {
        isSmallScreen.value = true
    } else {
        isSmallScreen.value = false
    }
}
</script>

<template>
    <nav class="relative flex bg-slate-800 text-white p-2 justify-between items-center">
        <button
            class="flex flex-col w-8 gap-1 sm:hidden outline outline-white p-2 rounded"
            @click="mobileMenuActive = !mobileMenuActive"
        >
            <span class="block w-full h-[2px] bg-white"></span>
            <span class="block w-full h-[2px] bg-white"></span>
            <span class="block w-full h-[2px] bg-white"></span>
        </button>
        <div class="flex sm:items-center gap-4">
            <img src="/favicon.ico" alt="App Icon" class="w-8 h-8 ml-6 sm:mr-4" />
            <ul
                class="absolute top-full left-0 flex flex-col sm:flex-row sm:static gap-2 bg-slate-800 rounded p-2 text-left w-full"
                v-if="mobileMenuActive || !isSmallScreen"
            >
                <li>
                    <router-link
                        :to="{ name: 'home' }"
                        class="text-slate-400 hover:bg-slate-700 hover:text-slate-50 py-1 px-4 rounded-md block"
                        >Home</router-link
                    >
                </li>
                <li>
                    <router-link
                        :to="{ name: 'flexbox' }"
                        class="text-slate-400 hover:bg-slate-700 hover:text-slate-50 py-1 px-4 rounded-md block"
                        >Flexbox</router-link
                    >
                </li>
                <li>
                    <router-link
                        :to="{ name: 'grid' }"
                        class="text-slate-400 hover:bg-slate-700 hover:text-slate-50 py-1 px-4 rounded-md block"
                        >Grid</router-link
                    >
                </li>
                <li>
                    <router-link
                        :to="{ name: 'pricing' }"
                        class="text-slate-400 hover:bg-slate-700 hover:text-slate-50 py-1 px-4 rounded-md block"
                        >Pricing</router-link
                    >
                </li>
                <li>
                    <router-link
                        :to="{ name: 'checkout' }"
                        class="text-slate-400 hover:bg-slate-700 hover:text-slate-50 py-1 px-4 rounded-md block"
                        >Checkout</router-link
                    >
                </li>
            </ul>
        </div>

        <div class="flex items-center gap-4">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                data-slot="icon"
                aria-hidden="true"
                class="size-6"
            >
                <path
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <div class="relative">
                <button @click="active = !active">
                    <img
                        src="https://avatars.githubusercontent.com/u/53143626?v=4"
                        alt=""
                        class="w-8 h-8 rounded-full"
                        :class="
                            active ? 'ring-white ring-2 ring-offset-4 ring-offset-slate-800' : ''
                        "
                    />
                </button>
                <ul
                    v-if="active"
                    class="absolute top-full bg-white text-slate-800 right-0 rounded min-w-[200px] flex flex-col"
                >
                    <li class="p-2 hover:bg-slate-300 rounded">Profile</li>
                    <li class="p-2 hover:bg-slate-300 rounded">Settings</li>
                    <li class="p-2 hover:bg-slate-300 rounded">Sign Out</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@reference "tailwindcss";

.router-link-active {
    @apply bg-slate-900 text-slate-50;
}
</style>

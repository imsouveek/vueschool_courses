<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="grid sm:grid-cols-3 max-w-4xl mx-auto h-dvh">
        <div
            class="p-4 h-full flex flex-col justify-center border-b-[1px] sm:border-r-[1px] border-slate-500"
        >
            <h1 class="text-4xl font-extralight mb-8">Playground</h1>
            <router-link class="block text-green-600 font-bold hover:text-green-500" to="/"
                >Home</router-link
            >
            <router-link class="block text-green-600 font-bold hover:text-green-500" to="/about"
                >About</router-link
            >
            <router-link class="block text-green-600 font-bold hover:text-green-500" to="/users"
                >Users</router-link
            >
            <router-link
                class="block text-green-600 font-bold hover:text-green-500"
                to="/advanced-components"
                >Advanced Components</router-link
            >
        </div>
        <div class="p-8 h-full flex flex-col justify-center sm:col-span-2">
            <router-view />
        </div>
    </div>
</template>

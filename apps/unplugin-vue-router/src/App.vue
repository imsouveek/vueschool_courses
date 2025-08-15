<script setup lang="ts">
import { RouterView } from 'vue-router'
import GoBack from './components/GoBack.vue'
import NavMenu from '@/components/navMenu/index.vue'
import { provide } from 'vue'
import { DarkModeInjectionKey } from '@/types/DarkModeInjectionKey'
import { useDark } from '@vueuse/core'

const isDark = useDark()
provide(DarkModeInjectionKey, isDark)
</script>

<template>
    <div class="grid sm:grid-cols-3 max-w-4xl mx-auto sm:h-dvh">
        <nav-menu />
        <div class="p-8 h-full flex flex-col justify-center sm:col-span-2">
            <go-back />
            <router-view />
        </div>
    </div>
</template>

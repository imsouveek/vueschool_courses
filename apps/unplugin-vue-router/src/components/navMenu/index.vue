<script setup lang="ts">
import { useDark } from '@vueuse/core'
import AppToggle from '@/components/base/AppToggle.vue'
import AppLink from '@/components/base/AppLink.vue'
import { ref } from 'vue'
import NavMenuHeader from '@/components/navMenu/NavMenuHeader.vue'
import NavMenuBody from '@/components/navMenu/NavMenuBody.vue'

const isDark = useDark()
const isMobileMenuActive = ref(false)
const closeMenu = () => (isMobileMenuActive.value = false)

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
    <div
        class="relative p-2 sm:p-8 sm:h-full flex flex-col sm:justify-center border-b-[1px] sm:border-r-[1px] border-amber-900"
    >
        <nav-menu-header @toggle-menu="isMobileMenuActive = !isMobileMenuActive"
            >Playground</nav-menu-header
        >
        <nav-menu-body v-model="isMobileMenuActive" :isSmallScreen="isSmallScreen">
            <app-toggle v-model="isDark">Dark Mode</app-toggle>
            <app-link to="/" @click="closeMenu"> Home </app-link>
            <app-link to="/about" @click="closeMenu"> About </app-link>
            <app-link to="/users" @click="closeMenu"> Users </app-link>
            <app-link to="/advanced-components" @click="closeMenu"> Advanced Components </app-link>
            <app-link to="/composables" @click="closeMenu"> Composables </app-link>
            <app-link to="/destinations" @click="closeMenu"> Destinations </app-link>
            <app-link to="/plugins" @click="closeMenu"> Plugins </app-link>
            <app-link to="https://vueschool.io"> Vue School </app-link>
        </nav-menu-body>
    </div>
</template>

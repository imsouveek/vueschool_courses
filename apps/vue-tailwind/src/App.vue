<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheMainNav from './components/TheMainNav.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
    <the-main-nav />
    <label for="darkMode">
        <span>Dark Mode</span>
        <input type="checkbox" name="darkMode" v-model="isDark" />
    </label>
    <div class="p-4">
        <router-view />
    </div>
</template>

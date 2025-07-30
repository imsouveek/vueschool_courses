<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { Suspense } from 'vue';
import TheNavigation from './components/TheNavigation.vue';

const route = useRoute()
</script>

<template>
    <the-navigation />
    <div class="container">
        <suspense>
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path"></component>
                </transition>
            </router-view>
        </suspense>
    </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeading from '@/components/base/AppHeading.vue'
</script>

<template>
    <div>
        <app-heading>Users</app-heading>
        <router-link
            to="/users/notnested"
            class="text-sm underline font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
        >
            Not Nested
            <tooltip text="Hello" :options="{ placement: 'top' }" />
        </router-link>
        <router-view></router-view>
    </div>
</template>

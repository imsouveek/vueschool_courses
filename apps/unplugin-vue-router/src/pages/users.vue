<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div>
        <h1 class="text-4xl mb-8">Users</h1>
        <router-link to="/users/notnested" class="text-green-600 font-bold hover:text-green-500">
            Not Nested
        </router-link>
        <router-view></router-view>
    </div>
</template>

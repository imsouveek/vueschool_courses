<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
        <router-link to="/users/create" class="text-green-600 font-bold hover:text-green-500">
            Create a new user
        </router-link>
        <h3 class="mt-8">List of all users</h3>
        <ul>
            <li><router-link to="/users/1">User 1</router-link></li>
            <li><router-link to="/users/2">User 2</router-link></li>
            <li><router-link to="/users/3">User 3</router-link></li>
        </ul>
    </div>
</template>

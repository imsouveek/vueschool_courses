<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
        <router-link
            to="/users/create"
            class="text-sm underline font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
        >
            Create a new user
        </router-link>
        <h3 class="mt-8">List of all users</h3>
        <ul>
            <li>
                <router-link
                    to="/users/1"
                    class="text-sm underline font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                >
                    User 1
                </router-link>
            </li>
            <li>
                <router-link
                    to="/users/2"
                    class="text-sm underline font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                >
                    User 2
                </router-link>
            </li>
            <li>
                <router-link
                    to="/users/3"
                    class="text-sm underline font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                >
                    User 3
                </router-link>
            </li>
        </ul>
    </div>
</template>

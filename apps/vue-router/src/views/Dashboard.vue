<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const username = ref<string>((window as any).user as string)
const router = useRouter()

const logout = () => {
    delete (window as any).user
    router.push({ name: 'home' })
}
</script>

<template>
    <div>
        <h1>Greetings, {{ username }}</h1>
        <button @click="logout">Logout</button>
        <router-link :to="{ name: 'invoices' }">
            <button>Invoices</button>
        </router-link>
    </div>
</template>

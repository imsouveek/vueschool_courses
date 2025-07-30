<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const username = ref<string>("")
const password = ref<string>("")

const router = useRouter()
const route = useRoute()

const login = () => {
    (window as any).user = username.value
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath as string)
}
</script>

<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" class="input">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" class="input">
            <button class="btn">Login</button>
        </form>

    </div>
</template>

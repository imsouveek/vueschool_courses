<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import EntryEditor from './components/EntryEditor.vue'
import EntryCard from '@/components/EntryCard.vue'
import type User from '@/types/User.ts'

import { reactive } from "vue";

const user: User = reactive({
    id: 1,
    username: 'sobo123',
    settings: []
})

console.log(user)
</script>

<template>
    <main class="container m-auto p-10">
        <TheHeader />
        <EntryEditor />
        <ul>
            <li>
                <EntryCard />
            </li>
        </ul>
    </main>
</template>

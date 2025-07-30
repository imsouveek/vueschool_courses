<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import EntryEditor from './components/EntryEditor.vue'
import EntryCard from '@/components/EntryCard.vue'
import type User from '@/types/User.ts'

import { provide, ref } from "vue";
import type Entry from '@/types/Entry';
import { userInjectionKey } from '@/types/injectionKeys';

const user = ref<User>({
    id: 1,
    username: 'sobo123',
    settings: []
})
console.log(user.value)

const journalEntries = ref<Entry[]>([])
const handleCreateEntry = (entry: Entry) => {
    journalEntries.value.unshift(entry)
}

provide(userInjectionKey, user.value)
</script>

<template>
    <main class="container m-auto p-10">
        <TheHeader />
        <EntryEditor @create-entry="handleCreateEntry" />
        <ul>
            <li v-for="entry in journalEntries" :key="entry.id">
                <EntryCard :entry="entry" />
            </li>
        </ul>
    </main>
</template>

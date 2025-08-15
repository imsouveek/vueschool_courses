<script setup lang="ts">
import type { ID, Task } from '~/types'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    (e: 'delete', payload: ID): void
}>()

const focused = ref(false)
onKeyStroke('Backspace', () => {
    if (focused.value) {
        emit('delete', props.task.id)
    }
})
</script>

<template>
    <div
        :title="task.createdAt.toLocaleDateString()"
        tabindex="0"
        class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex hover:shadow-md focus:outline-amber-600 focus:outline-1"
        @focus="focused = true"
        @blur="focused = false"
    >
        <drag-handle pr-2 />
        <span>{{ props.task.title }}</span>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.sortable-drag .task {
    @apply rotate-6;
}

.sortable-ghost .task {
    @apply relative;
}

.sortable-ghost .task::after {
    @apply content-[''] absolute top-0 bottom-0 left-0 right-0 bg-amber-300 rounded;
}
</style>

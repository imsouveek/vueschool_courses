<script setup lang="ts">
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import type { Column, Task } from '~/types'

const alt = useKeyModifier('Control')

const columns = useLocalStorage<Column[]>(
    'vue-trello-board',
    [
        {
            id: nanoid(),
            title: 'Backlog',
            tasks: [
                {
                    id: nanoid(),
                    title: 'Create marketing landing page',
                    createdAt: new Date()
                },
                {
                    id: nanoid(),
                    title: 'Develop cool new feature',
                    createdAt: new Date()
                },
                {
                    id: nanoid(),
                    title: 'Fix page nav bug',
                    createdAt: new Date()
                }
            ]
        },
        {
            id: nanoid(),
            title: 'Selected for dev',
            tasks: []
        },
        {
            id: nanoid(),
            title: 'In progress',
            tasks: []
        },
        {
            id: nanoid(),
            title: 'In QA',
            tasks: []
        },
        {
            id: nanoid(),
            title: 'Complete',
            tasks: []
        }
    ],
    {
        serializer: {
            read: (value) => {
                return (JSON.parse(value) as Column[]).map((column: Column) => {
                    column.tasks = column.tasks.map((task) => {
                        task.createdAt = new Date(task.createdAt)
                        return task
                    })
                    return column
                })
            },
            write: (value) => JSON.stringify(value)
        }
    }
)

const createColumn = () => {
    const column: Column = {
        id: nanoid(),
        title: '',
        tasks: []
    }
    columns.value.push(column)
    nextTick(() => {
        ;(document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
    })
}
</script>

<template>
    <div class="flex overflow-x-auto items-start gap-4">
        <draggable
            v-model="columns"
            group="columns"
            item-key="id"
            class="flex gap-4 items-start"
            :animation="150"
            handle=".drag-handle"
        >
            <template #item="{ element: column }: { element: Column }">
                <div class="column bg-amber-100 p-5 rounded min-w-[250px]">
                    <header class="font-bold text-amber-950 mb-4">
                        <drag-handle />
                        <input
                            v-model="column.title"
                            type="text"
                            class="title-input bg-transparent focus:bg-white focus:outline-amber-600 rounded px-1 w-4/5"
                            @keyup.enter="($event.target as HTMLInputElement).blur()"
                            @keydown.backspace="
                                column.title === ''
                                    ? (columns = columns.filter((c) => c.id !== column.id))
                                    : null
                            "
                        />
                    </header>
                    <draggable
                        v-model="column.tasks"
                        :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
                        item-key="id"
                        :animation="150"
                        handle=".drag-handle"
                    >
                        <template #item="{ element: task }: { element: Task }">
                            <div>
                                <trello-board-task
                                    :task="task"
                                    @delete="
                                        column.tasks = column.tasks.filter((t) => t.id !== $event)
                                    "
                                />
                            </div>
                        </template>
                    </draggable>
                    <footer>
                        <new-task @add="column.tasks.push($event)" />
                    </footer>
                </div>
            </template>
        </draggable>
        <button class="bg-amber-100 whitespace-nowrap p-2 rounded opacity-50" @click="createColumn">
            + Add another column
        </button>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.sortable-ghost {
    @apply relative;
}

.sortable-ghost ::after {
    @apply content-[''] absolute top-0 bottom-0 left-0 right-0 bg-amber-300 rounded;
}
</style>

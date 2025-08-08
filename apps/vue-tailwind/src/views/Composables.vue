<script setup lang="ts">
import { useCycleList } from 'vue-composables'
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'

const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const { state, index, prev, next } = useCycleList(list, {
    fallbackIndex: list.value.length,
    getIndexOf: (value, list) => {
        return list.findIndex((v) => v > value)
    }
})

state.value = 4

const steps = ref('')

const goSteps = () => {
    next(null, parseInt(steps.value) || 1)
}
const goPrev = () => {
    const n = parseInt(steps.value)
    if (n) {
        prev(n)
    } else {
        prev()
    }
}

const goNext = () => {
    const n = parseInt(steps.value)
    if (n) {
        next(n)
    } else {
        next()
    }
}
</script>

<template>
    <div class="max-w-4xl mx-auto">
        <h1 class="font-extralight text-2xl">Composables</h1>
        <hr class="bg-gray-400 my-2 h-[2px]" />
        <div class="my-8">
            <span
                v-for="(i, idx) in list"
                :key="idx"
                :class="[
                    'my-8 mx-4 py-2 px-4 text-2xl text-green-800 dark:text-white',
                    {
                        'rounded-full font-bold border-[1px] bg-green-400 dark:bg-green-600 text-green-800 dark:text-white border-green-800 dark:border-white':
                            idx === index
                    }
                ]"
            >
                {{ i }}</span
            >
        </div>
        <app-input label="Number" v-model="steps" />
        <div class="py-8">
            <app-button @click="goPrev()">Prev</app-button>
            <app-button class="mx-4" @click="goNext()">Next</app-button>
            <app-button @click="goSteps">Go Steps</app-button>
        </div>
    </div>
</template>

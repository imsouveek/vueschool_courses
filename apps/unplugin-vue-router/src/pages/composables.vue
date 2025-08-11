<script setup lang="ts">
import { useCycleList } from 'vue-composables'
import { ref } from 'vue'
import AppButton from '@/components/base/AppButton.vue'
import AppInput from '@/components/base/AppInput.vue'
import AppHeading from '@/components/base/AppHeading.vue'

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
        <app-heading>Composables</app-heading>
        <div class="my-8 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10">
            <div
                v-for="(i, idx) in list"
                :key="idx"
                :class="[
                    'my-8 mx-4 py-2 px-4 w-10 h-10',
                    {
                        'rounded-full font-bold border-[1px] bg-amber-400 dark:bg-amber-600':
                            idx === index
                    }
                ]"
            >
                {{ i }}
            </div>
        </div>
        <app-input label="Number" v-model="steps" />
        <div class="py-8">
            <app-button @click="goPrev()">Prev</app-button>
            <app-button class="mx-4" @click="goNext()">Next</app-button>
            <app-button @click="goSteps">Go Steps</app-button>
        </div>
    </div>
</template>

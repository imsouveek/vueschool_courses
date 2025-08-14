<script setup lang="ts">
import { useCycleList } from '@/composables/useCycleList'
import { ref } from 'vue'

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
    <div>
        <h1>Composables</h1>
        <div class="item-container">
            <div
                v-for="(i, idx) in list"
                :key="idx"
                :class="[
                    'item',
                    {
                        'active-item': idx === index
                    }
                ]"
            >
                {{ i }}
            </div>
        </div>
        <input type="number" v-model="steps" />
        <div>
            <button @click="goPrev()">Prev</button>
            <button @click="goNext()">Next</button>
            <button @click="goSteps">Go Steps</button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.item-container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    margin: 8px 16px;
    padding: 4px 8px;
    width: 20px;
    height: 20px;
    text-align: center;
}

.active-item {
    border-radius: 50%;
    font-weight: bold;
    border: 1px solid;
    background-color: green;
}
</style>

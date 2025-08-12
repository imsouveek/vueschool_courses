<script setup lang="ts">
import { ref } from 'vue'

const tooltipText = ref('Hello World')
</script>

<template>
    <h1>Custom Vue.JS 3 Plugins</h1>
    <input type="text" v-model="tooltipText" />
    <br />
    <span
        >Hover over me
        <Tooltip :text="tooltipText" :options="{ placement: 'bottom' }" />
    </span>
    <span
        >And me
        <Tooltip :text="tooltipText" />
    </span>
    <br />
    <button @click="$hideAllTooltips()">Clear Tooltips</button>
</template>

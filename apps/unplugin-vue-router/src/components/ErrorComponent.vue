<script setup lang="ts">
import AppButton from './base/AppButton.vue'

const showError = () => {
    throw new Error('Application error')
}
</script>

<template>
    <app-button @click="showError"> Show an Error </app-button>
</template>

<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { ref } from 'vue'

const textInput = ref('')
</script>

<template>
    <div class="m-10">
        <app-card class="mb-4" />
        <app-input label="Username" :required="true" v-model="textInput" />
        <app-button>Submit</app-button>
        {{ textInput }}
    </div>
</template>

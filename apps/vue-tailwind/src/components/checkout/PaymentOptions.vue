<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const selectedPaymentOption = ref(0)
const isActive = (n: number) => selectedPaymentOption.value === n
</script>

<template>
    <ul class="flex items-center gap-6 bg-slate-800 text-slate-400">
        <li>
            <button
                @click="selectedPaymentOption = 0"
                :class="['cursor-pointer', { active: isActive(0) }]"
            >
                <Icon icon="simple-icons:visa" width="48" height="48" />
            </button>
        </li>
        <li>
            <button
                @click="selectedPaymentOption = 1"
                :class="['cursor-pointer', { active: isActive(1) }]"
            >
                <Icon icon="streamline-logos:american-express-logo-solid" width="36" height="36" />
            </button>
        </li>
        <li>
            <button
                @click="selectedPaymentOption = 2"
                :class="['cursor-pointer', { active: isActive(2) }]"
            >
                <Icon icon="simple-icons:dinersclub" width="36" height="36" />
            </button>
        </li>
        <li>
            <button
                @click="selectedPaymentOption = 3"
                :class="['cursor-pointer', { active: isActive(3) }]"
            >
                <Icon icon="lineicons:mastercard" width="48" height="48" />
            </button>
        </li>
        <li>
            <button
                @click="selectedPaymentOption = 4"
                :class="['cursor-pointer', { active: isActive(4) }]"
            >
                <Icon icon="simple-icons:paypal" width="24" height="24" />
            </button>
        </li>
    </ul>
</template>

<style scoped>
@reference "tailwindcss";

.active {
    @apply text-green-600;
}
</style>

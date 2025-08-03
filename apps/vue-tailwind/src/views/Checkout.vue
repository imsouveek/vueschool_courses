<script setup lang="ts">
import CheckoutLeftColumn from '@/components/checkout/CheckoutLeftColumn.vue'
import CheckoutRightColumn from '@/components/checkout/CheckoutRightColumn.vue'
</script>

<template>
    <div class="bg-gray-300 rounded h-screen min-h-80 relative">
        <div
            class="bg-green-600 rounded-2xl mx-auto max-w-4xl outline outline-white absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
            <div class="bg-slate-800 rounded-2xl grid grid-cols-5 outline outline-white relative z-10">
                <checkout-left-column />
                <checkout-right-column />
            </div>

            <div class="absolute bottom-0 left-8 right-8 border-0 h-20 shadow-2xl/70 shadow-black z-0" />
        </div>
    </div>
</template>

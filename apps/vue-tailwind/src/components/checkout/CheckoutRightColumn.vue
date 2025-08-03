<script setup lang="ts">
import CheckoutNav from '@/components/checkout/CheckoutNav.vue'
import PaymentOptions from '@/components/checkout/PaymentOptions.vue'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
</script>

<template>
    <div class="col-span-3 px-16 py-8">
        <checkout-nav />
        <div class="text-2xl uppercase font-bold pt-8 pb-6">Checkout</div>
        <payment-options />
        <checkout-form />
        <div class="flex flex-row justify-end pr-24 pt-16">
            <button class="uppercase font-bold flex flex-row items-center gap-4 cursor-pointer relative group">
                Continue
                <span class="block h-[1px] w-8 bg-green-600 group-hover:w-6 transition-all origin-right "></span>
                <span
                    class="absolute right-0 w-3 h-[1px] bg-green-600 group-hover:rotate-45 transition-all origin-right"></span>
                <span
                    class="absolute right-0 w-3 h-[1px] bg-green-600 group-hover:rotate-[-45deg] transition-all origin-right"></span>
            </button>
        </div>
    </div>
</template>

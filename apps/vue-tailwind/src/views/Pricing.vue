<script setup lang="ts">
import PricingCard from '@/components/PricingCard.vue'
</script>
<template>
    <div class="gap-6 p-4 grid lg:grid-cols-3 md:grid-cols-2 max-w-6xl mx-auto">
        <PricingCard
            :price="29"
            :features="[
                'Unlimited Access to All Features',
                '24/7 Customer Support',
                'Customizable Dashboard',
                'Advanced Analytics Tools',
                'Integration with Third-Party Services',
                'Secure Data Encryption'
            ]"
            name="Starter"
            description="Best option for personal use & for your next project."
        >
        </PricingCard>
        <PricingCard
            name="Plus"
            :features="[
                'Multi-User Collaboration Tools',
                'Real-Time Data Backup',
                'Mobile App Access',
                'Custom Branding Options',
                'Automated Reporting System'
            ]"
            :price="50"
            description="Great for small teams and anyone looking to scale"
        ></PricingCard>

        <PricingCard
            name="Enterprise"
            :features="[
                'Priority Feature Updates',
                'Extended Data Storage Capacity',
                'Personalized User Experience',
                'In-Depth Training Materials',
                'Dedicated Account Manager'
            ]"
            :price="150"
            description="Best for large scale uses and extended redistribution rights."
        ></PricingCard>
    </div>
</template>

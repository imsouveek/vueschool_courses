<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const OverridenLink = RouterLink as any
const props = defineProps({
    ...(RouterLink as any).props
})

const isExternal = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
    <a v-if="isExternal" :href="props.to" target="_blank" rel="noopener" class="external-link">
        <slot />
    </a>
    <overriden-link v-else v-bind="$props" class="internal-link">
        <slot />
    </overriden-link>
</template>

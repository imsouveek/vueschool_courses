<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const OverridenLink = RouterLink as any
const props = defineProps({
    ...(RouterLink as any).props
})

const isExternal = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
    <a
        v-if="isExternal"
        :href="props.to"
        target="_blank"
        rel="noopener"
        class="p-2 block text-amber-900 dark:text-amber-400 text-xl hover:text-amber-700 dark:hover:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800 rounded"
    >
        <div class="flex gap-2 items-center">
            <slot />
            <Icon icon="material-symbols:open-in-new-rounded" width="24" height="24" />
        </div>
    </a>
    <overriden-link
        v-else
        v-bind="$props"
        activeClass="bg-amber-300 dark:bg-amber-700 font-bold"
        class="p-2 block text-amber-900 dark:text-amber-400 text-xl hover:text-amber-700 dark:hover:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800 rounded"
    >
        <slot />
    </overriden-link>
</template>

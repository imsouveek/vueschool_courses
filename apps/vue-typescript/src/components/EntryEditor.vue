<script lang="ts" setup>
import EmojiField from '@/components/EmojiField.vue'
import ArrowCircleRight from '@/assets/icons/arrow-circle-right.svg'
import { computed, inject, onMounted, ref } from 'vue'
import type { Emoji } from '@/types/Emoji'
import type Entry from '@/types/Entry'
import { userInjectionKey } from '@/types/injectionKeys'

// data
const text = ref('')
const emoji = ref<Emoji | null>(null)
const charCount = computed(() => text.value.length)
const maxChars = 280
const user = inject(userInjectionKey)

// template refs
const textarea = ref<HTMLTextAreaElement | null>(null)

// emits
const emit = defineEmits<{
    (e: 'createEntry', entry: Entry): void
}>()

// methods
onMounted(() => textarea.value?.focus())

const handleTextInput = (e: Event) => {
    const textarea = e.target as HTMLTextAreaElement
    if (textarea.value.length <= 280) {
        text.value = textarea.value
    } else {
        text.value = textarea.value = textarea.value.substring(0, maxChars)
    }
}

const handleFormSubmit = () => {
    emit('createEntry', {
        body: text.value,
        emoji: emoji.value,
        createdAt: new Date(),
        userId: 1,
        id: Math.random()
    })

    text.value = ''
    emoji.value = null
}
</script>

<template>
    <form class="entry-form" @submit.prevent="handleFormSubmit">
        <textarea
            :value="text"
            @keyup="handleTextInput"
            ref="textarea"
            :placeholder="`New Journal Entry for ${user?.username || 'anonymous'}`"
        ></textarea>
        <EmojiField v-model="emoji" />
        <div class="entry-form-footer">
            <span> {{ charCount }} / {{ maxChars }}</span>
            <button>
                Remember
                <ArrowCircleRight width="20" />
            </button>
        </div>
    </form>
</template>

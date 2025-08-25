<script setup lang="ts">
import { KEYBOARD_ROWS } from '@/settings';
import WordleLetter from '@/components/WordleLetter.vue';
import { useWordleGame } from '@/composables/useWordleGame';

const keyboardRows = KEYBOARD_ROWS
const { letterFeedback } = useWordleGame()
</script>

<template>
    <ul class="flex flex-col mt-16 items-center" data-test="wordle-keyboard">
        <li v-for="i in 3" :key="i" class="flex gap-2 pb-2 w-fit" :data-test="`keyboard-row-${i}`">
            <wordle-letter v-for="letter in keyboardRows[i - 1].letters" :key="letter" :letter="letter" enable-click
                :feedback="letterFeedback.get(letter)" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { KEYBOARD_ROWS } from '@/settings';
import WordleLetter from './WordleLetter.vue';

const keyboardRows = KEYBOARD_ROWS
</script>

<template>
    <ul class="keyboard flex flex-col mt-16 items-center">
        <li v-for="i in 3" :key="i" class="flex gap-2 pb-2 w-fit" :data-keyboard-row="i">
            <wordle-letter v-for="letter in keyboardRows[i - 1].letters" :key="letter" :letter="letter" enable-click />
        </li>
    </ul>
</template>

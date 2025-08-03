<script setup lang="ts"></script>

<template>
    <section class="grid grid-cols-4 gap-2 grid-flow-dense">
        <div class="col-span-2 row-span-2"><span>1</span></div>
        <div><span>2</span></div>
        <div><span>3</span></div>
        <div><span>4</span></div>
        <div><span>5</span></div>
        <div><span>6</span></div>
        <div><span>7</span></div>
        <div class="col-span-3"><span>8</span></div>
        <div><span>9</span></div>
        <div><span>10</span></div>
        <div><span>11</span></div>
        <div><span>12</span></div>
    </section>
</template>

<style scoped>
@reference "tailwindcss";

div {
    @apply bg-gray-400 min-h-[100px] text-gray-800 even:bg-gray-600 even:text-gray-100 flex items-center justify-center;
}
</style>

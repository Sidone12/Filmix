<template>
<div class="max-w-sm bg-slate-300 border border-gray-200  rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center p-2 max-h-[600px] overflow-hidden">
    <NuxtLink @click="changeItemState(item)" :to="`/item/${title}`">
        <img v-if="poster_path" class="rounded-t-lg" :src="`${imageSiteUrl}${poster_path}`" :alt="title" />
    </NuxtLink>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{title}}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Release Date: {{ release_date }}</p>
        <p v-if="overview" class="inline-flex items-center text-sm font-medium  text-gray-700  rounded-md  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800">
            {{ overview }}
        </p>
        <p v-else class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-700  rounded-md  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800">
            No Overview available
        </p>
    </div>
</div>
</template>

<script setup>

defineProps([
    'title',
    'id',
    'overview',
    'release_date',
    'popularity',
    'poster_path',
    'item'
])
const imageSiteUrl = 'https://media.themoviedb.org/t/p/w500'

const itemState = useState('chosenItem', () => { })

const changeItemState = (item) => {
    itemState.value = item
}
</script>

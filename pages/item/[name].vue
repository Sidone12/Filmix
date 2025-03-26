<template>
  <div class="flex justify-center">
    <div v-if="item"
      class="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-4xl  dark:border-gray-700 dark:bg-gray-800">
      <img class="object-cover w-full rounded-t-lg md:h-auto md:w-80 md:rounded-none md:rounded-s-lg"
        v-if="item.poster_path" :src="`${imageSiteUrl}${item.poster_path}`" :alt="item.title || item.name" />
      <div class="flex flex-col justify-between p-4 leading-normal">

        <h5 v-if="item.release_date" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
          item.title }}</h5>
        <h5 v-if="item.first_air_date" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
          item.name }}</h5>

        <p v-if="item.release_date" class="mb-3 font-normal text-gray-700 dark:text-gray-400">Release Date: {{
          item.release_date }}</p>
        <p v-if="item.first_air_date" class="mb-3 font-normal text-gray-700 dark:text-gray-400">Release Date: {{
          item.first_air_date }}</p>

        <p v-if="item.overview" class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.overview }}</p>
        <p v-else class="mb-3 font-normal text-gray-700 dark:text-gray-400">No Overview available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const imageSiteUrl = 'https://media.themoviedb.org/t/p/w500'
const itemState = useState('chosenItem', () => {
  return {}
})
const item = itemState.value
</script>

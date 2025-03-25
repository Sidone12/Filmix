<template>
  <section>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Now Playing Movies
      </h1>
      <ul class="grid grid-cols-5" v-if="movies.length">
        <li v-for="movie in movies">
          <MovieCard
            :poster_path="movie.poster_path"
            :title="movie.title"
            :id="movie.id"
            :overview="movie.overview"
            :release_date="movie.release_date"
            :popularity="movie.popularity"
            :item="movie"
          />
        </li>
      </ul>
      <p>There are no available movies</p>
    </section>
</template>

<script setup>
const movies = useState(() => [])

// альтернатива для отримання даних
const { data } = await useFetch('/api/movies/nowplaying', {
  transform: (rawData) => {
    return rawData.results || []
  }
})

watchEffect(() => {
  if (data.value) {
    movies.value = data.value
  }
})
// const { data } = await useFetch('/api/movies/nowplaying', {
//       default: () => ({ movies: { results: []} })
// })

//   watchEffect(() => {
//     if (data.value) {
//       movies.value = data.value.results;
//     }
// });

// гарантований мікс який поверне і масив і без зайвої вкладеності
// const { data } = await useFetch('/api/movies/nowplaying', {
//   default: () => ({ results: [] }),
//   transform: (rawData) => {
//     console.log("Fetched data:", rawData)
//     return rawData?.results || []
//   }
// })

// watchEffect(() => {
//   if (data.value.length) {
//     movies.value = data.value
//     console.log("Movies updated:", movies.value)
//   }
// })
</script>

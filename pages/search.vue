<template>
  <div>

    <form class="max-w-md mx-auto">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input v-model="searchTerm" type="text" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies, Series..." required />
      </div>
    </form>
    <section v-if="movies.length">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Movies Results
      </h1>
      <ul class="grid grid-cols-5 gap-1">
        <li v-for="movie in movies">
          <MovieCard :poster_path="movie.poster_path" :title="movie.title" :id="movie.id" :overview="movie.overview"
            :release_date="movie.release_date" :popularity="movie.popularity" :item="movie" />
        </li>
      </ul>
    </section>
    <br /><br />
    <section v-if="series.length">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        TV Series Results
      </h1>
      <ul class="grid grid-cols-5">
        <li v-for="tvseries in series">
          <SeriesCard :poster_path="tvseries.poster_path" :name="tvseries.name"
            :first_air_date="tvseries.first_air_date" :overview="tvseries.overview" :popularity="tvseries.popularity"
            :item="tvseries" />
        </li>
      </ul>
    </section>


  </div>
</template>

<script setup>
const searchTerm = useState('searchTerm', () => '')
const movies = useState(() => [])
const series = useState(() => [])

const { data } = await useFetch('/api/movies/search', {
  query: {
    searchTerm
  },
  immediate: false,
  default: () => ({ movies: { results: [] }, series: { results: [] } })
});

watchEffect(() => {
  if (data.value) {
    movies.value = data.value.movies;
    series.value = data.value.series;
  }
});
</script>

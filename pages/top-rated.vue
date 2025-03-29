<template>
  <div>
    <section v-if="movies.length">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Top Rated Movies
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
        Top Rated TV Series
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
const movies = useState(() => [])
const series = useState(() => [])

const { data } = await useFetch('/api/movies/toprated', {
  default: () => ({ movies: { results: [] }, series: { results: [] } })
});

watchEffect(() => {
  if (data.value) {
    movies.value = data.value.topRatedMovies;
    series.value = data.value.topRatedSeries;
  }
});
</script>

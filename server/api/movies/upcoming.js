export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;

  const upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming';

  try {
    const upcomingMovies = await $fetch(upcomingMoviesUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`,
      },
    });

    return {results: upcomingMovies.results};
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw createError({statusCode: 500, statusMessage: 'Failed to fetch movies'});
  }
});

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;

  const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing';

  try {
    const nowPlayingMovies = await $fetch(nowPlayingUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`,
      },
    });

    return {results: nowPlayingMovies.results};
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw createError({statusCode: 500, statusMessage: 'Failed to fetch movies'});
  }
});

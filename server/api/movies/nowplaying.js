export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;

   const API_BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';

  try {
    const {results = []} = await $fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`,
      },
      query: {language: 'en-US', page: 1},
    });
    return {results};
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw createError({statusCode: 500, statusMessage: 'Failed to fetch movies'});
  }
});

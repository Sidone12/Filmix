export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const commonHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${AccessToken}`,
  };
  try {
    const [popularMovies, popularSeries] = await Promise.all([
      $fetch(`${API_BASE_URL}/movie/popular`, {method: 'GET', headers: commonHeaders}),
      $fetch(`${API_BASE_URL}/tv/popular`, {method: 'GET', headers: commonHeaders}),
    ]);

    return {
      popularMovies: popularMovies.results || [],
      popularSeries: popularMovies.results || []
    };
  } catch (error) {
    console.error('Error fetching popular movies and series:', error);
    throw createError({statusCode: 500, statusMessage: 'Failed to fetch popular movies and series'});
  }
});

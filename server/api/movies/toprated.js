export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;
  
  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const commonHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${AccessToken}`,
  };
  try {
    const [topRatedMovies, topRatedSeries] = await Promise.all([
      $fetch(`${API_BASE_URL}/movie/top_rated`, {method: 'GET', headers: commonHeaders}),
      $fetch(`${API_BASE_URL}/tv/top_rated`, {method: 'GET', headers: commonHeaders}),
    ]);
    return {
      topRatedMovies: topRatedMovies.results || [],
      topRatedSeries: topRatedSeries.results || [],
    };
  } catch (error) {
    console.error('Error fetching movies and series:', error);
    throw createError({statusCode: 500, statusMessage: 'Failed to fetch movies and series'});
  }
});

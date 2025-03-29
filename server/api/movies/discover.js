export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const { AccessToken } = config;
  
  const API_BASE_URL = 'https://api.themoviedb.org/3/discover';
  const commonHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${AccessToken}`,
  };
  const queryParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
  };

  try {
    const [movies, series] = await Promise.all([
      $fetch(`${API_BASE_URL}/movie`, { method: 'GET', headers: commonHeaders, query: queryParams }),
      $fetch(`${API_BASE_URL}/tv`, { 
        method: 'GET', 
        headers: commonHeaders, 
        query: { ...queryParams, include_null_first_air_dates: false } 
      })
    ]);
     return {
       movies: movies.results || [],
       series: series.results || [],
    };
  } catch (error) {
    console.error('Error fetching movies and series:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movies and series' });
  }
});

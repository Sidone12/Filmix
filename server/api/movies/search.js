export default defineEventHandler(async event => {
  const userQuery = getQuery(event);
  const {searchTerm} = userQuery;
  const config = useRuntimeConfig(event);
  const {AccessToken} = config;

  const API_BASE_URL = 'https://api.themoviedb.org/3/search';
  const commonHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${AccessToken}`,
  };
  const queryParams = {
    query: searchTerm,
  };
  try {
    const [movies, series] = await Promise.all([
      $fetch(`${API_BASE_URL}/movie`, { method: 'GET', headers: commonHeaders, query: queryParams }),
      $fetch(`${API_BASE_URL}/tv`, { method: 'GET', headers: commonHeaders, query: queryParams })
    ]);
     return {
       movies: movies.results || [],
       series: series.results || [],
    };
  } catch (error) {
    console.error('Error fetching search movies and series:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movies and series' });
  }
});

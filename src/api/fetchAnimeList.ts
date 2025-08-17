import { baseDataFetch } from '@/api/baseFetch';
import { API_CONFIG, type AppStringQueries, baseAnimeListQuery, tagMap } from '@/api/config';
import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

const baseQueryString = Object.fromEntries(
  Object.entries(baseAnimeListQuery).map(([key, value]) => [key, value.toString()])
);

export const fetchAnimeList = ({ query, ...rest }: AppStringQueries) => {
  const queryParameters = { ...baseQueryString, q: query, ...rest };

  return baseDataFetch<PaginatedType<Anime>>({
    endpoint: API_CONFIG.ENDPOINTS.ANIME,
    queryParameters,
    options: { next: { tags: [tagMap.list] } },
  });
};

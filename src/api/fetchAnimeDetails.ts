import { baseDataFetch } from '@/api/baseFetch';
import { API_CONFIG, tagMap } from '@/api/config';
import type { Anime, DataType } from '@/models/animeModel';

export const fetchAnimeDetails = (id: string) => {
  return baseDataFetch<DataType<Anime>>({
    endpoint: API_CONFIG.ENDPOINTS.ANIME,
    path: `/${id}`,
    options: { next: { tags: [tagMap.details(id)] } },
  });
};

import { baseFetch } from '@/api/baseFetch';
import { API_CONFIG } from '@/api/config';
import type { Anime, DataType } from '@/models/animeModel';

export const fetchAnimeDetails = (id: string) => {
  return baseFetch<DataType<Anime>>({
    endpoint: API_CONFIG.ENDPOINTS.ANIME,
    path: `/${id}`,
  });
};

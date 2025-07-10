import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

import { API_CONFIG } from './apiConfig';
import { BaseApiService, type QueryParameters } from './baseApi';

type AnimeListQueryParams = Omit<QueryParameters, 'limit' | 'sfw'>;

export class AnimeApi<T> extends BaseApiService {
  private baseAnimeListQuery = {
    sfw: true,
    limit: 20,
  };

  public getAnimeList(queryParameters: AnimeListQueryParams) {
    return this.fetch<PaginatedType<T>>({
      queryParameters: { ...this.baseAnimeListQuery, ...queryParameters },
    });
  }

  public getAnimeDetails(id: number) {
    return this.fetch<T>({ path: id });
  }
}

export const animeApi = new AnimeApi<Anime>(API_CONFIG.ENDPOINTS.ANIME);

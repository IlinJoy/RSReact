import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

import { API_CONFIG, baseAnimeListQuery } from './apiConfig';
import { BaseApiService, type Endpoint, type QueryParameters } from './baseApi';

export type AnimeListQueryParams = Omit<QueryParameters, 'limit' | 'sfw'>;

export class AnimeApi<T> extends BaseApiService {
  baseAnimeListQuery;
  constructor(endpoint: Endpoint, baseAnimeListQuery: QueryParameters) {
    super(endpoint);
    this.baseAnimeListQuery = baseAnimeListQuery;
  }

  public getAnimeList(queryParameters?: AnimeListQueryParams) {
    return this.fetch<PaginatedType<T>>({
      queryParameters: { ...this.baseAnimeListQuery, ...queryParameters },
    });
  }

  public getAnimeDetails(id: number) {
    return this.fetch<T>({ path: id });
  }
}

export const animeApi = new AnimeApi<Anime>(
  API_CONFIG.ENDPOINTS.ANIME,
  baseAnimeListQuery
);

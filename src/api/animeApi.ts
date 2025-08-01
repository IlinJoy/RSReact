import { API_CONFIG, baseAnimeListQuery } from '@/api/apiConfig';
import { BaseApiService, type Endpoint, type QueryParameters } from '@/api/baseApi';
import type { Anime, DataType } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

export type AnimeListQueryParams = Omit<QueryParameters, 'limit' | 'sfw'>;

export class AnimeApi<T> extends BaseApiService {
  baseAnimeListQuery;
  constructor(endpoint: Endpoint, baseAnimeListQuery: QueryParameters) {
    super(endpoint);
    this.baseAnimeListQuery = baseAnimeListQuery;
  }

  public getAnimeList(queryParameters?: AnimeListQueryParams, init?: RequestInit) {
    return this.fetch<PaginatedType<T>>({
      queryParameters: { ...this.baseAnimeListQuery, ...queryParameters },
      init,
    });
  }

  public getAnimeDetails(id: number, init?: RequestInit) {
    return this.fetch<DataType<T>>({ path: id, init });
  }
}

export const animeApi = new AnimeApi<Anime>(API_CONFIG.ENDPOINTS.ANIME, baseAnimeListQuery);

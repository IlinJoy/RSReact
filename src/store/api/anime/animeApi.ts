import type { Anime, DataType } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';
import { type AppStringQueries, baseAnimeListQuery } from '@/store/api/anime/config';
import { API_CONFIG } from '@/store/api/config';
import { jikanApi } from '@/store/api/jikanApi';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';

const {
  ENDPOINTS: { ANIME },
} = API_CONFIG;

export const animeApi = jikanApi.injectEndpoints({
  endpoints: (build) => ({
    getAnimePaginatedList: build.query<PaginatedType<Anime>, AppStringQueries>({
      query: ({ query, ...rest }) => ({
        url: ANIME,
        params: { ...baseAnimeListQuery, q: query, ...rest },
      }),
      transformResponse: ({ pagination, data: rawData }: PaginatedType<Anime>) => ({
        pagination,
        data: filterDuplicateResponseItemsById(rawData),
      }),
      providesTags: ['Anime'],
    }),
    getAnimeDetails: build.query<Anime, string>({
      query: (id) => `${ANIME}/${id}`,
      transformResponse: (response: DataType<Anime>) => response.data,
      providesTags: ['Anime'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAnimeDetailsQuery, useGetAnimePaginatedListQuery } = animeApi;

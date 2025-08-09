import { useQueryParams } from '@/hooks/useQueryParams';
import { useGetAnimePaginatedListQuery } from '@/store/api/anime/animeApi';

export function useGetAnimeList() {
  const { appQueryParams } = useQueryParams();

  return useGetAnimePaginatedListQuery(appQueryParams);
}

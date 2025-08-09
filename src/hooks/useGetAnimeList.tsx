import { useInvalidateCache } from '@/hooks/useInvalidateCache';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useGetAnimePaginatedListQuery } from '@/store/api/anime/animeApi';

export function useGetAnimeList() {
  const { appQueryParams } = useQueryParams();
  const invalidateCache = useInvalidateCache();

  return {
    ...useGetAnimePaginatedListQuery(appQueryParams),
    invalidate: () => invalidateCache('LIST'),
  };
}

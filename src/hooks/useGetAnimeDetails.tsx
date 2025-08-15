import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'next/navigation';

import { useInvalidateCache } from '@/hooks/useInvalidateCache';
import { useGetAnimeDetailsQuery } from '@/store/api/anime/animeApi';

export function useGetAnimeDetails() {
  const params = useParams<{ id: string }>();
  const invalidateCache = useInvalidateCache();

  return {
    ...useGetAnimeDetailsQuery(params?.id ?? skipToken),
    invalidate: () => invalidateCache(params?.id),
  };
}

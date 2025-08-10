import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { useInvalidateCache } from '@/hooks/useInvalidateCache';
import { useGetAnimeDetailsQuery } from '@/store/api/anime/animeApi';

export function useGetAnimeDetails() {
  const { detailsId } = useParams();
  const invalidateCache = useInvalidateCache();

  return {
    ...useGetAnimeDetailsQuery(detailsId ?? skipToken),
    invalidate: () => invalidateCache(detailsId),
  };
}

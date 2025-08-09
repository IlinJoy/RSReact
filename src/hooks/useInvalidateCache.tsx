import { useCallback } from 'react';

import { animeApi } from '@/store/api/anime/animeApi';
import { useAppDispatch } from '@/store/hooks/base';

export function useInvalidateCache() {
  const dispatch = useAppDispatch();

  const invalidate = useCallback(
    (id?: string) => {
      dispatch(animeApi.util.invalidateTags([{ type: 'Anime', id }]));
    },
    [dispatch]
  );

  return invalidate;
}

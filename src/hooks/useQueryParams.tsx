import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

import type { AnimeListQueryParams } from '@/api/animeApi';

type AppQueries = Omit<AnimeListQueryParams, 'q'> & { query?: string };

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = useCallback(
    (key: keyof AppQueries) => searchParams.get(key),
    [searchParams]
  );

  const setQueryParams = useCallback(
    (newValues: AppQueries) => {
      setSearchParams(
        (params) => {
          Object.entries(newValues).forEach(([key, value]) => {
            if (value) {
              params.set(key, value.toString());
            } else {
              params.delete(key);
            }
          });
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetQueryParams = useCallback(() => {
    setSearchParams('', { replace: true });
  }, [setSearchParams]);

  return { setQueryParams, getQueryParam, resetQueryParams };
}

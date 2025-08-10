import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import type { AppQueries, AppStringQueries } from '@/store/api/anime/config';

const appParamsKeys: (keyof AppQueries)[] = ['query', 'page'];

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appQueryParams = useMemo(() => {
    return appParamsKeys.reduce<AppStringQueries>((acc, key) => {
      acc[key] = searchParams.get(key) ?? undefined;
      return acc;
    }, {});
  }, [searchParams]);

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

  return { setQueryParams, resetQueryParams, appQueryParams };
}

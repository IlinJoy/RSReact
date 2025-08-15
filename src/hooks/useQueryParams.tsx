import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { AppQueries, AppStringQueries } from '@/store/api/anime/config';

const appParamsKeys: (keyof AppQueries)[] = ['query', 'page'];

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const appQueryParams = useMemo(() => {
    return appParamsKeys.reduce<AppStringQueries>((acc, key) => {
      acc[key] = searchParams?.get(key) ?? undefined;
      return acc;
    }, {});
  }, [searchParams]);

  const setQueryParams = useCallback((newValues: AppQueries) => {
    const params = new URLSearchParams(searchParams?.toString());

    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}${params ? '?' + params.toString() : ''}`);
  }, []);

  const resetQueryParams = useCallback(() => {
    router.replace(pathname || '/');
  }, []);

  return { setQueryParams, resetQueryParams, appQueryParams };
}

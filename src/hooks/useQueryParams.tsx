import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { AppQueries, AppStringQueries } from '@/api/config';

const appParamsKeys: (keyof AppQueries | 'details')[] = ['query', 'page', 'details'];
type WithDetails<T> = T & { details?: string };

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const appQueryParams = useMemo(() => {
    return appParamsKeys.reduce<WithDetails<AppStringQueries>>((acc, key) => {
      const value = searchParams?.get(key);

      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {});
  }, [searchParams]);

  const setQueryParams = useCallback(
    (newValues: WithDetails<AppQueries>) => {
      const params = new URLSearchParams(searchParams ?? '');

      Object.entries(newValues).forEach(([key, value]) => {
        if (value) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      router.replace(`${pathname}${params ? '?' + params.toString() : ''}`);
    },
    [pathname, router, searchParams]
  );

  const resetQueryParams = useCallback(() => {
    router.replace(pathname || '/');
  }, [pathname, router]);

  return { setQueryParams, resetQueryParams, appQueryParams };
}

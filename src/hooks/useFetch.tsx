import { useEffect, useState } from 'react';

import { getError } from '@/utils/handleErrorMessage';

export function useFetcher<T>({ callback }: { callback: (signal: AbortSignal) => Promise<T> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<T>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchData = await callback(abortController.signal);
        setData(fetchData);
      } catch (error) {
        const fetchError = getError(error);
        if (fetchError.name !== 'AbortError') {
          setError(fetchError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();

    return () => {
      abortController.abort();
    };
  }, [callback]);

  return { isLoading, data, error };
}

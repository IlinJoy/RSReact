'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { handleDownload, postRequest } from '@/utils/downloadUtils';
import { normalizeError } from '@/utils/normalizeError';

export type UseDownloadProps = {
  fileName: string;
  endpoint: string;
};

export function useDownload<T>({ fileName, endpoint }: UseDownloadProps) {
  const [error, setError] = useState<string>();
  const urlRef = useRef<string>(null);

  const handleUrlRevoke = () => {
    if (urlRef.current !== null) {
      URL.revokeObjectURL(urlRef.current);
    }
  };

  const download = useCallback(
    async (data: T) => {
      try {
        const response = await postRequest(endpoint, data);

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;

        handleDownload(url, fileName);
        handleUrlRevoke();
      } catch (error) {
        setError(normalizeError(error).message);
      }
    },
    [endpoint, fileName]
  );

  useEffect(() => {
    return () => handleUrlRevoke();
  }, []);

  return { download, error };
}

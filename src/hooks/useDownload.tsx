import { type RefObject, useCallback, useEffect, useRef } from 'react';

import { createDownloadUrl, type CreateDownloadUrlOptions } from '@/utils/downloadUtils';

export type UseDownloadProps<T> = { fileName: string; options: CreateDownloadUrlOptions<T> };

export function useDownload<T>({ fileName, options }: UseDownloadProps<T>) {
  const urlRef = useRef<string>(null);

  const handleUrlRevoke = () => {
    if (urlRef.current !== null) {
      URL.revokeObjectURL(urlRef.current);
    }
  };

  const download = useCallback(
    (data: T, downloadLinkRef: RefObject<HTMLAnchorElement | null>) => {
      if (!downloadLinkRef.current) {
        return;
      }
      const url = createDownloadUrl(data, options);

      urlRef.current = url;
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = fileName;
      downloadLinkRef.current.click();
      setTimeout(() => handleUrlRevoke());
    },
    [fileName, options]
  );

  useEffect(() => {
    return () => handleUrlRevoke();
  }, []);

  return { download };
}

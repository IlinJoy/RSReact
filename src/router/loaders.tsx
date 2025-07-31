import { type Params } from 'react-router';

import { animeApi } from '@/api/animeApi';
import { checkIsValidNumberToQuery, redirectWithStoredQuery } from '@/router/loadersUtils';
import { getFromLocalStorage, STORAGE_KEYS } from '@/utils/localStorageUtils';

type LoaderProps = { params: Params<string>; request: Request };

export const animeListLoader = async ({ request }: LoaderProps) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');

  if (page) {
    checkIsValidNumberToQuery(page);
  }

  const queryFromParams = url.searchParams.get('query') || '';
  const queryFromStorage =
    getFromLocalStorage<string>(STORAGE_KEYS.PREFIX + STORAGE_KEYS.ANIME) || '';

  if (!queryFromParams && queryFromStorage) {
    redirectWithStoredQuery(url, queryFromStorage);
  }

  return await animeApi.getAnimeList(
    { page: Number(page), q: queryFromParams },
    { signal: request.signal }
  );
};

export const animeDetailsLoader = async ({ params }: Omit<LoaderProps, 'request'>) => {
  const id = params.detailsId;
  checkIsValidNumberToQuery(id);

  return await animeApi.getAnimeDetails(Number(id));
};

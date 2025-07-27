import { type Params } from 'react-router';

import { animeApi } from '@/api/animeApi';
import { checkIsValidNumberPath } from '@/utils/checkIsValidPath';

type LoaderProps = { params: Params<string>; request: Request };

export const animeListLoader = async ({ params, request }: LoaderProps) => {
  const q = new URL(request.url).searchParams.get('q') || '';
  const page = Number(params.page || 1);
  checkIsValidNumberPath(page);

  return await animeApi.getAnimeList({ page, q }, { signal: request.signal });
};

export const animeDetailsLoader = async ({ params }: Omit<LoaderProps, 'request'>) => {
  const id = Number(params.detailsId);
  checkIsValidNumberPath(id);

  return await animeApi.getAnimeDetails(id);
};

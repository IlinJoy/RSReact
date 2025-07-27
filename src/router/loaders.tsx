import { type Params, redirect } from 'react-router';

import { animeApi } from '@/api/animeApi';

type LoaderProps = { params: Params<string>; request: Request };

export const animeListLoader = async ({ params, request }: LoaderProps) => {
  const q = new URL(request.url).searchParams.get('q') || '';
  const page = Number(params.page || 1);

  if (isNaN(page) || page <= 0) {
    throw redirect('*');
  }

  return await animeApi.getAnimeList({ page, q }, { signal: request.signal });
};

export const animeDetailsLoader = async ({ params }: Omit<LoaderProps, 'request'>) => {
  const id = Number(params.detailsId);
  return await animeApi.getAnimeDetails(id);
};

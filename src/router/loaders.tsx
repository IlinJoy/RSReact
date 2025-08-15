// import { type Params } from 'react-router';

// import { checkIsValidNumberToQuery, redirectWithStoredQuery } from '@/router/loadersUtils';
// import { animeApi } from '@/store/api/anime/animeApi';
// import { store } from '@/store/store';
// import { getFromLocalStorage, STORAGE_KEYS } from '@/utils/localStorageUtils';

// type LoaderProps = { params: Params<string>; request: Request };

// export const animeListRedirection = async ({ request }: LoaderProps) => {
//   const url = new URL(request.url);
//   const page = url.searchParams.get('page') || undefined;

//   if (page) {
//     checkIsValidNumberToQuery(page);
//   }

//   const queryFromParams = url.searchParams.get('query') || undefined;
//   const queryFromStorage =
//     getFromLocalStorage<string>(STORAGE_KEYS.PREFIX + STORAGE_KEYS.ANIME) || '';

//   if (!queryFromParams && queryFromStorage) {
//     redirectWithStoredQuery(url, queryFromStorage);
//   }

//   return null;
// };

// export const animeDetailsLoader = async ({ params }: Omit<LoaderProps, 'request'>) => {
//   const id = params.detailsId || '';
//   checkIsValidNumberToQuery(id);

//   store.dispatch(animeApi.util.prefetch('getAnimeDetails', id, {}));

//   return null;
// };

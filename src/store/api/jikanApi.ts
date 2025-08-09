import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@/store/api/config';

const baseUrl = API_CONFIG.BASE_URL + API_CONFIG.VERSION;

export const jikanApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Anime'],
  endpoints: () => ({}),
});

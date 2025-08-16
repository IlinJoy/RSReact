import { type AnimeQueryStringParameters, API_CONFIG } from '@/api/config';

type BaseFetchParams = {
  path?: string;
  endpoint?: string;
  queryParameters?: AnimeQueryStringParameters;
  options?: RequestInit;
};

export async function baseFetch<T>({
  path = '',
  endpoint = '',
  queryParameters,
  options,
}: BaseFetchParams): Promise<[undefined, T] | [unknown]> {
  try {
    const queryString = generateQueryString(queryParameters);
    const response = await fetch(
      `${API_CONFIG.BASE_URL + API_CONFIG.VERSION + endpoint + path}${queryString}`,
      { cache: 'force-cache', next: { revalidate: 3000 }, ...options }
    );
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    if (response.statusText) {
      await new Promise((res) => setTimeout(res, 400));
    }

    return [undefined, data as T];
  } catch (error) {
    return [error as unknown];
  }
}

function generateQueryString(queryParameters?: Record<string, string>) {
  return queryParameters
    ? `?${new URLSearchParams(Object.entries(queryParameters).filter(([, value]) => value))}`
    : '';
}

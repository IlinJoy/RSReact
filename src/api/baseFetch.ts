import { type AnimeQueryStringParameters, API_CONFIG } from '@/api/config';

type BaseFetchParams = {
  path?: string;
  endpoint?: string;
  queryParameters?: AnimeQueryStringParameters;
};

export async function baseFetch<T>({
  path = '',
  endpoint = '',
  queryParameters,
}: BaseFetchParams): Promise<[undefined, T] | [Error]> {
  try {
    const queryString = generateQueryString(queryParameters);
    const response = await fetch(
      `${API_CONFIG.BASE_URL + API_CONFIG.VERSION + endpoint + path}${queryString}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return [undefined, data as T];
  } catch (error) {
    return [error as Error];
  }
}

function generateQueryString(queryParameters?: Record<string, string>) {
  return queryParameters
    ? `?${new URLSearchParams(Object.entries(queryParameters).filter(([, value]) => value))}`
    : '';
}

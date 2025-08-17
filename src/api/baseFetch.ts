import { type AnimeQueryStringParameters, API_CONFIG } from '@/api/config';

type BaseDataFetchParams = {
  path?: string;
  endpoint?: string;
  queryParameters?: AnimeQueryStringParameters;
  options?: RequestInit;
};

export async function baseDataFetch<T>({
  path = '',
  endpoint = '',
  queryParameters,
  options,
}: BaseDataFetchParams): Promise<[undefined, T] | [unknown]> {
  try {
    const { BASE_URL, VERSION, BASE_OPTIONS } = API_CONFIG;
    const queryString = generateQueryString(queryParameters);

    const response = await fetch(`${BASE_URL + VERSION + endpoint + path}${queryString}`, {
      ...BASE_OPTIONS,
      ...options,
    });

    const data: T = await response.json();

    if (!response.ok) {
      throw data;
    }

    if (response.statusText) {
      await new Promise((res) => setTimeout(res, 400));
    }

    return [undefined, data];
  } catch (error) {
    return [error as unknown];
  }
}

function generateQueryString(queryParameters?: Record<string, string>) {
  return queryParameters
    ? `?${new URLSearchParams(Object.entries(queryParameters).filter(([, value]) => value))}`
    : '';
}

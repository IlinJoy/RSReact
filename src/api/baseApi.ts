import { ERROR_MESSAGES } from '@/constants/messages';
import type { ApiSearchParams } from '@/models/apiParamsModel';

import { API_CONFIG } from './apiConfig';

export type QueryParameters = Partial<ApiSearchParams>;

type Endpoint =
  (typeof API_CONFIG.ENDPOINTS)[keyof typeof API_CONFIG.ENDPOINTS];

type FetchParams = {
  path?: string | number;
  queryParameters?: QueryParameters;
};

export class BaseApiService {
  private basePath = API_CONFIG.BASE_URL + API_CONFIG.VERSION;
  private endpoint;

  constructor(endpoint: Endpoint) {
    this.endpoint = endpoint;
  }

  public async fetch<T>({ path = '', queryParameters }: FetchParams) {
    const queryString = this.generateQueryString(queryParameters);
    const response = await fetch(
      `${this.basePath + path}${this.endpoint}${queryString}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH);
    }

    const data: T = await response.json();
    return data;
  }

  private generateQueryString(queryParameters?: QueryParameters) {
    return queryParameters
      ? `?${Object.entries(queryParameters)
          .map(([key, value]) => {
            if (value) {
              return typeof value === 'boolean' ? key : `${key}=${value}`;
            }
          })
          .join('&')}`
      : '';
  }
}

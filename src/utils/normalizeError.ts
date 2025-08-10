import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { RESPONSE_CODES } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/messages';

const isObject = (maybeObject: unknown): maybeObject is object =>
  typeof maybeObject === 'object' && maybeObject !== null;

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return isObject(error) && 'status' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return isObject(error) && 'message' in error && typeof error.message === 'string';
};

const getErrorMessage = (error: FetchBaseQueryError): string => {
  if ('error' in error) {
    return error.error;
  }

  if (error.status === RESPONSE_CODES.BAD_REQUEST) {
    return ERROR_MESSAGES.BAD_REQUEST;
  } else if (error.status === RESPONSE_CODES.LIMIT) {
    return ERROR_MESSAGES.RATE_LIMIT;
  } else if (error.status) {
    return ERROR_MESSAGES.FETCH;
  }

  return ERROR_MESSAGES.UNKNOWN;
};

export const normalizeError = (error: unknown) => {
  if (isFetchBaseQueryError(error)) {
    return { status: error.status, message: getErrorMessage(error) };
  } else if (error instanceof Error || isErrorWithMessage(error)) {
    return { message: error.message };
  } else {
    return { message: ERROR_MESSAGES.DEFAULT };
  }
};

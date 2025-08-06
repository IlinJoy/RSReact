import { ERROR_MESSAGES } from '@/constants/messages';

export const getError = (error: unknown) => {
  return error instanceof Error ? error : new Error(ERROR_MESSAGES.DEFAULT);
};

import { ERROR_MESSAGES } from '@/constants/messages';

export const handleErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : ERROR_MESSAGES.DEFAULT;
};

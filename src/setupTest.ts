import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('@/validation/formSchema', async () => {
  const { formSchema: originalFormSchema } = await import('@/validation/formSchema');
  return {
    formSchema: originalFormSchema.omit(['image']),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

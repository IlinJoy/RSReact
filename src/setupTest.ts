import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import { generateMockData } from '@/test-utils/generateMockData';
import { server } from '@/test-utils/handlers/server';
import { initializeDb } from '@/test-utils/mocks/db';

beforeAll(() => {
  initializeDb(Array.from({ length: 3 }, (_, index) => generateMockData({ mal_id: index })));
  server.listen();
});

beforeEach(() => {
  vi.mock('./store/middlewares/middleware', async (importOriginal) => {
    const mod = await importOriginal<typeof import('./store/middlewares/middleware')>();
    return {
      ...mod,
      DELAY: 0,
    };
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

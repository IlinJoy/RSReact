import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import { generateMockData } from './test-utils/generateMockData';
import { server } from './test-utils/handlers/server';
import { initializeDb } from './test-utils/mocks/db';
import { filterDuplicateResponseItemsById } from './utils/filterDuplicateResponseItemsById';

beforeAll(() => {
  initializeDb(
    filterDuplicateResponseItemsById([
      (generateMockData(), generateMockData(), generateMockData()),
    ])
  );

  server.listen();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

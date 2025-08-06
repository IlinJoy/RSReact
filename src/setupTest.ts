import '@testing-library/jest-dom';

import { generateMockData } from '@test-utils/generateMockData';
import { server } from '@test-utils/handlers/server';
import { initializeDb } from '@test-utils/mocks/db';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

beforeAll(() => {
  initializeDb(Array.from({ length: 3 }, (_, index) => generateMockData({ mal_id: index })));
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

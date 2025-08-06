import { setupServer } from 'msw/node';

import { handlers } from '@/test-utils/handlers/handlers';

export const server = setupServer(...handlers);

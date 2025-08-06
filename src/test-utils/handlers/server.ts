import { handlers } from '@test-utils/handlers/handlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);

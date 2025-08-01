import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { routes } from '@/router/router';

export function setupUserEvent(jsx: ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

export const setupWithRouter = (path = '/') => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  return {
    user: userEvent.setup(),
    router,
    ...render(<RouterProvider router={router} />),
  };
};

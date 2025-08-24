import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

export const setupUserEvent = (jsx: ReactNode, renderOptions?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(jsx, { ...renderOptions }),
  };
};

import { routes } from '@router/router';
import { type AppStore, type RootState, setupStore } from '@store/store';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';

type SetupProvider = FC<{ children: ReactNode }>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  providers?: SetupProvider[];
}

export const combineProviders = (children: ReactNode, providers: SetupProvider[]) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};

export function setupWithProviders(
  jsx: ReactNode,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    providers = [],
    ...renderOptions
  }: ExtendedRenderOptions
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{combineProviders(children, providers)}</Provider>
  );
  return { store, ...render(jsx, { wrapper: Wrapper, ...renderOptions }) };
}

export const setupUserEvent = (jsx: ReactNode, renderOptions?: ExtendedRenderOptions) => {
  return {
    user: userEvent.setup(),
    ...setupWithProviders(jsx, { ...renderOptions }),
  };
};

export const setupWithRouter = (path = '/', renderOptions?: ExtendedRenderOptions) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  return {
    user: userEvent.setup(),
    router,
    ...setupWithProviders(<RouterProvider router={router} />, { ...renderOptions }),
  };
};

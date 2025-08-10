import { createBrowserRouter } from 'react-router';

import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { Spinner } from '@/components/Spinner/Spinner';
import { Root } from '@/pages/Root';
import { AboutPage, AnimeDetails, HomePage, NotFoundPage } from '@/router/lazyElements';
import { animeDetailsLoader, animeListRedirection } from '@/router/loaders';
import { ROUTES } from '@/router/routes';

export const routes = [
  {
    element: <Root />,
    errorElement: <FallbackUi />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        loader: animeListRedirection,
        HydrateFallback: Spinner,
        children: [
          {
            path: `${ROUTES.DETAILS}/:detailsId`,
            loader: animeDetailsLoader,
            HydrateFallback: Spinner,
            element: <AnimeDetails />,
          },
        ],
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

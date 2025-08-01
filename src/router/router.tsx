import { createBrowserRouter } from 'react-router';

import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { GlobalSpinner } from '@/components/GlobalSpinner/GlobalSpinner';
import { Spinner } from '@/components/Spinner/Spinner';
import { Root } from '@/pages/Root';
import { AboutPage, AnimeDetails, HomePage, NotFoundPage } from '@/router/lazyElements';
import { animeDetailsLoader, animeListLoader } from '@/router/loaders';
import { ROUTES } from '@/router/routes';

export const routes = [
  {
    element: <Root />,
    errorElement: <FallbackUi />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        HydrateFallback: GlobalSpinner,
        loader: animeListLoader,
        errorElement: <FallbackUi buttonMessage="Back To List" />,
        children: [
          {
            path: `${ROUTES.DETAILS}/:detailsId`,
            element: <AnimeDetails />,
            HydrateFallback: Spinner,
            loader: animeDetailsLoader,
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

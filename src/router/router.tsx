import { createBrowserRouter } from 'react-router';

import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { Root } from '@/pages/Root';
import { AboutPage, AnimeDetails, HomePage, NotFoundPage } from '@/router/lazyElements';
import { animeDetailsLoader, animeListLoader } from '@/router/loaders';

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <FallbackUi />,
    children: [
      {
        path: ':page?',
        element: <HomePage />,
        loader: animeListLoader,
        errorElement: <FallbackUi buttonMessage="Back To List" />,
        children: [{ path: ':detailsId', element: <AnimeDetails />, loader: animeDetailsLoader }],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { Layout } from '@/pages/Layout';

const HomePage = lazy(() =>
  import('../pages/HomePage/HomePage').then((module) => ({ default: module.HomePage }))
);
const AnimeDetails = lazy(() =>
  import('../components/AnimeDetails/AnimeDetails').then((module) => ({
    default: module.AnimeDetails,
  }))
);
const AboutPage = lazy(() =>
  import('../pages/AboutPage/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ':page?/', // Note the ? making it optional
        element: <HomePage />,
        children: [{ path: ':detailsId', element: <AnimeDetails /> }],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

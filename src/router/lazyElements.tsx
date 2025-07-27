import { lazy } from 'react';

export const HomePage = lazy(() =>
  import('../pages/HomePage/HomePage').then((module) => ({ default: module.HomePage }))
);

export const AnimeDetails = lazy(() =>
  import('../components/AnimeDetails/AnimeDetails').then((module) => ({
    default: module.AnimeDetails,
  }))
);

export const AboutPage = lazy(() =>
  import('../pages/AboutPage/AboutPage').then((module) => ({ default: module.AboutPage }))
);

export const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

export const AnimeList = lazy(() =>
  import('../components/AnimeList/AnimeList').then((module) => ({ default: module.AnimeList }))
);

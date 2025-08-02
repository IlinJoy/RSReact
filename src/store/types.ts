import type { PayloadAction } from '@reduxjs/toolkit';

export type CheckedItems = {
  id: number;
  title: string;
  title_japanese: string;
  genres: string[];
  episodes: number;
  duration: string;
  year: number;
  images: string;
};

export type CheckedItemsState = { data: CheckedItems[] };
export type PayloadAnimeAction = PayloadAction<CheckedItems>;

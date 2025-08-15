import { isClient } from '@/constants/common';

export const STORAGE_KEYS = {
  PREFIX: 'ilinjoy-',
  ANIME: 'task-anime',
  THEME: 'theme',
} as const;

export type LocalStorageKey = Exclude<
  (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS],
  typeof STORAGE_KEYS.PREFIX
>;

export const SEARCH_TERM_STORAGE_KEY = STORAGE_KEYS.PREFIX + STORAGE_KEYS.ANIME;

export const getFromLocalStorage = <T>(key: string) => {
  if (!isClient) {
    return;
  }

  try {
    const data = localStorage.getItem(key);
    const parsedData: T = data && JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setToLocalStorage = <T>(key: string, data: T) => {
  if (!isClient) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

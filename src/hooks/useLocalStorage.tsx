import { useEffect, useState } from 'react';

import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorageUtils';

export const STORAGE_KEYS = {
  PREFIX: 'ilinjoy-',
  ANIME: 'task-anime',
} as const;

type LocalStorageKey = Exclude<
  (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS],
  typeof STORAGE_KEYS.PREFIX
>;

export function useLocalStorage<T>(key: LocalStorageKey, initValue: T) {
  const storageKey = STORAGE_KEYS.PREFIX + key;
  const [value, setValue] = useState<T>(() => getFromLocalStorage(storageKey) || initValue);

  useEffect(() => {
    setToLocalStorage(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue] as const;
}

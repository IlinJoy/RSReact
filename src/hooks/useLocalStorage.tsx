import { useCallback, useState } from 'react';

import {
  getFromLocalStorage,
  type LocalStorageKey,
  setToLocalStorage,
  STORAGE_KEYS,
} from '@/utils/localStorageUtils';

export function useLocalStorage<T>(key: LocalStorageKey, initValue: T) {
  const storageKey = STORAGE_KEYS.PREFIX + key;
  const [value, setValue] = useState<T>(() => getFromLocalStorage(storageKey) || initValue);

  const updateStorage = useCallback(
    (value: T) => {
      setToLocalStorage(storageKey, value);
      setValue(value);
    },
    [storageKey]
  );

  return [value, updateStorage] as const;
}

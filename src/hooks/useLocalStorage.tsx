import { useCallback, useState } from 'react';

import { getFromLocalStorage, setToLocalStorage, STORAGE_KEYS } from '@/utils/localStorageUtils';

type LocalStorageKey = Exclude<
  (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS],
  typeof STORAGE_KEYS.PREFIX
>;

export function useLocalStorage<T>(key: LocalStorageKey, initValue: T) {
  const storageKey = STORAGE_KEYS.PREFIX + key;
  const [value, setValue] = useState<T>(() => getFromLocalStorage(storageKey) || initValue);

  const updateStorage = useCallback(
    (value: T) => {
      setToLocalStorage(storageKey, value);
      setValue((prev) => ({ ...prev, value }));
    },
    [storageKey]
  );

  return [value, updateStorage] as const;
}

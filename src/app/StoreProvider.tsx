'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import { type AppStore, setupStore } from '@/store/store';

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

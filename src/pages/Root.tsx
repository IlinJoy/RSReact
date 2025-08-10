import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';

export function Root() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

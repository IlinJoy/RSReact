import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { Spinner } from '@/components/Spinner/Spinner';

export function Layout() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </main>
  );
}

import { GlobalSpinner } from '@components/GlobalSpinner/GlobalSpinner';
import { Header } from '@components/Header/Header';
import { Spinner } from '@components/Spinner/Spinner';
import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router';

export function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <main>
        {navigation.state === 'loading' && <GlobalSpinner />}
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

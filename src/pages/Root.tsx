import { Outlet, useNavigation } from 'react-router';

import { GlobalSpinner } from '@/components/GlobalSpinner/GlobalSpinner';
import { Header } from '@/components/Header/Header';

export function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <main>
        {navigation.state === 'loading' && <GlobalSpinner />}
        <Outlet />
      </main>
    </>
  );
}

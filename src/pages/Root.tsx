import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';

import { Spinner } from '@/components/Spinner/Spinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Root() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const [searchTerm] = useLocalStorage('task-anime', '');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      navigate(`/1${searchTerm ? '?q=' + encodeURIComponent(searchTerm) : ''}`);
      initializedRef.current = true;
    }
  }, [navigate, searchTerm]);

  return (
    <main>
      {isNavigating && <Spinner />}
      <Suspense fallback={<Spinner />}>{initializedRef.current && <Outlet />}</Suspense>
    </main>
  );
}

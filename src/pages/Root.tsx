import { useEffect, useRef } from 'react';
import {
  generatePath,
  Outlet,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router';

import { GlobalSpinner } from '@/components/GlobalSpinner/GlobalSpinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Root() {
  const navigate = useNavigate();
  const { location } = useNavigation();
  const [searchParams] = useSearchParams();
  const { page = '1', detailsId = null } = useParams();
  const [searchTerm] = useLocalStorage('task-anime', '');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    const query = searchParams.get('q') || searchTerm;
    const path = generatePath('/:page?/:detailsId?', { page, detailsId });
    const search = query ? `?q=${encodeURIComponent(query)}` : '';

    navigate(`${path}${search}`);
    initializedRef.current = true;
  }, [detailsId, navigate, page, searchParams, searchTerm]);

  return (
    <main>
      {location && <GlobalSpinner />}
      {initializedRef.current && <Outlet />}
    </main>
  );
}

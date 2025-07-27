import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useLocalStorage } from '@/hooks/useLocalStorage';

export function RedirectWithSearch() {
  const navigate = useNavigate();
  const [searchQuery] = useLocalStorage('task-anime', '');

  useEffect(() => {
    navigate(`/1${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`, { replace: true });
  }, [navigate, searchQuery]);

  return null;
}

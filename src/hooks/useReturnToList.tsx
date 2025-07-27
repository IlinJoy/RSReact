import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useNavigateTo() {
  const navigate = useNavigate();
  const { page } = useParams();

  const navigateTo = useCallback(
    (search?: string, newPage?: string) => {
      navigate(`/${newPage || page}${search || ''}`);
    },
    [navigate, page]
  );

  return navigateTo;
}

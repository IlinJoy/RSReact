import { useCallback, useState } from 'react';

import { getPasswordStrength } from '@/utils/getPasswordStrength';

export function useStrength() {
  const [strength, setStrength] = useState<string>();

  const updateStrength = useCallback((value: string) => {
    setStrength(getPasswordStrength(value));
  }, []);

  return { strength, updateStrength };
}

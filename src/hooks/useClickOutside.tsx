import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

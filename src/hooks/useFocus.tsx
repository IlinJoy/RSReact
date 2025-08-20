import { useEffect, useRef } from 'react';

export function useFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current;
    element.focus();

    const focusable = element.querySelectorAll('select, button, input');
    const firstFocusable = focusable[0] instanceof HTMLElement ? focusable[0] : null;
    const lastFocusable = focusable[focusable.length - 1];

    const handleFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.addEventListener('keydown', handleFocus);

    return () => {
      document.removeEventListener('keydown', handleFocus);
    };
  }, []);

  return ref;
}

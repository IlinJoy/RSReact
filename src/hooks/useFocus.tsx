import { useEffect, useRef } from 'react';

export function useFocus<T extends HTMLElement>() {
  const modalRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.focus();
    const element = modalRef.current;

    const focusableSelectors = [
      'button:not([inert])',
      'input:not([inert])',
      'select:not([inert])',
      'a[href]:not([inert])',
    ].join(', ');

    const focusable = element.querySelectorAll(focusableSelectors);
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

  return { modalRef };
}

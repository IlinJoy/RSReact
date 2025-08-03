import { createContext, type ReactNode, use, useCallback, useLayoutEffect, useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Theme = 'light' | 'dark' | null;

type ThemeContextType = {
  theme: Theme;
  updateTheme: (theme: Exclude<Theme, null>) => void;
};

const defaultValue = {
  theme: null,
  updateTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('theme', null);
  const [theme, setTheme] = useState(
    () =>
      storedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const updateTheme = useCallback(
    (theme: Exclude<Theme, null>) => {
      setTheme(theme);
      setStoredTheme(theme);
    },
    [setStoredTheme]
  );

  return <ThemeContext value={{ theme, updateTheme }}>{children}</ThemeContext>;
}

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('Must be used within a ThemeContext');
  }
  return context;
};

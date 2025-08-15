'use client';

import { createContext, type ReactNode, use, useLayoutEffect } from 'react';

import { isClient } from '@/constants/common';
import { APP_THEMES } from '@/context/theme/themeConfig';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Theme = keyof typeof APP_THEMES;

type ThemeContextType = {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
};

const defaultValue = {
  theme: APP_THEMES.dark.value,
  updateTheme: () => {},
} as const;

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { light, dark } = APP_THEMES;
  const [theme, updateTheme] = useLocalStorage<Theme>(
    'theme',
    isClient && window.matchMedia('(prefers-color-scheme: light)').matches
      ? light.value
      : dark.value
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext value={{ theme, updateTheme }}>{children}</ThemeContext>;
}

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('Must be used within a ThemeContext');
  }
  return context;
};

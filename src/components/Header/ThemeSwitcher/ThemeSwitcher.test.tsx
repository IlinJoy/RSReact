import { screen } from '@testing-library/react';

import { ThemeSwitcher } from '@/components/Header/ThemeSwitcher/ThemeSwitcher';
import { ThemeContextProvider } from '@/context/theme/ThemeContext';
import { setupUserEvent, setupWithProviders } from '@/test-utils/setupRender';

const mockUpdateTheme = vi.fn();
let themeValue = 'dark';

vi.mock('@/components/SpriteIcon/SpriteIcon.tsx', () => ({
  SpriteIcon: ({ id }: { id: string }) => <img aria-label={id} />,
}));

vi.mock('@/context/theme/ThemeContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/context/theme/ThemeContext')>();
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      theme: themeValue,
      updateTheme: mockUpdateTheme,
    })),
  };
});

vi.stubGlobal(
  'matchMedia',
  vi.fn(() => themeValue)
);

describe('Theme Switcher Component', () => {
  describe('Render', () => {
    it('should render correctly', () => {
      setupWithProviders(<ThemeSwitcher />, { providers: [ThemeContextProvider] });

      expect(screen.getByLabelText(/light/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dark/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/sun/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/moon/i)).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    afterEach(() => (themeValue = 'dark'));

    it('should toggle theme', async () => {
      const { user } = setupUserEvent(<ThemeSwitcher />, { providers: [ThemeContextProvider] });

      await user.click(screen.getByLabelText(/light/i));

      expect(mockUpdateTheme).toHaveBeenCalledWith('light');
      expect(screen.getByLabelText(/dark/i)).toBeChecked();
      expect(screen.getByLabelText(/light/i)).not.toBeChecked();
    });
  });
});

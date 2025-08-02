import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useTheme } from '@/context/theme/ThemeContext';

import styles from './ThemeSwitcher.module.scss';

const appThemes = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
] as const;

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme();

  return (
    <div className={styles.wrapper}>
      {appThemes.map((item) => {
        const { value, label, icon } = item;
        return (
          <div key={value} className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="radio"
              id={value}
              name="themes"
              checked={theme === value}
              onChange={() => updateTheme(value)}
            />
            <label htmlFor={value} className={styles.label}>
              <SpriteIcon id={icon} size={16} />
              <span>{label}</span>
            </label>
          </div>
        );
      })}
      <span className={styles.slider}></span>
    </div>
  );
}

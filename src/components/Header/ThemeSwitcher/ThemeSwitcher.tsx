import { useTranslations } from 'next-intl';

import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { APP_THEMES } from '@/context/theme/themeConfig';
import { useTheme } from '@/context/theme/ThemeContext';

import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme();
  const t = useTranslations('Theme');

  return (
    <div className={styles.wrapper}>
      {Object.values(APP_THEMES).map((item) => {
        const { value, icon } = item;
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
              <span>{t(value)}</span>
            </label>
          </div>
        );
      })}
      <span className={styles.slider}></span>
    </div>
  );
}

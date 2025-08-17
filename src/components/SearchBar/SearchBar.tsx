'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';

import { tagMap } from '@/api/config';
import { revalidate } from '@/api/revalidate';
import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useTheme } from '@/context/theme/ThemeContext';

import styles from './SearchBar.module.scss';

export type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const t = useTranslations('SearchBar');

  const isDirty = inputValue.trim() !== searchTerm;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const searchTerm = inputValue.trim();
    onSearch(searchTerm);
  };

  const resetSearch = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            name="search"
            type="text"
            placeholder={t('placeholder')}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className={styles.input}
          />
          {inputValue && (
            <Button
              aria-label="reset"
              type="reset"
              onClick={resetSearch}
              className={clsx(styles.resetButton, { [styles.light]: theme === 'light' })}
              icon={<SpriteIcon id="close" size={16} />}
            />
          )}
        </div>

        <Button type="submit" disabled={!isDirty} size="medium">
          {t('button')}
        </Button>
      </form>
      <Button
        aria-label={t('ivalidButton')}
        title={t('ivalidButton')}
        onClick={() => revalidate(tagMap.list)}
        className={styles.closeBtn}
        size="small"
        icon={<SpriteIcon id="reload" size={24} />}
      />
    </div>
  );
}

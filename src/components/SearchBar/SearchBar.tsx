import { Button } from '@components/Button/Button';
import { SpriteIcon } from '@components/SpriteIcon/SpriteIcon';
import { useTheme } from '@context/theme/ThemeContext';
import clsx from 'clsx';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import styles from './SearchBar.module.scss';

export type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const initialValueRef = useRef<string>(searchTerm);
  const isDirty = inputValue.trim() !== searchTerm;

  useEffect(() => {
    if (initialValueRef.current !== searchTerm) {
      setInputValue(searchTerm);
      initialValueRef.current = searchTerm;
    }
  }, [searchTerm]);

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
            placeholder="Looking for..."
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

        <Button type="submit" text="Search" disabled={!isDirty} size="medium" />
      </form>
    </div>
  );
}

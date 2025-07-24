import { type FormEvent, useRef, useState } from 'react';

import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';

import styles from './SearchBar.module.scss';

export type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const initialValueRef = useRef<string>(searchTerm);
  const isDirty = inputValue !== initialValueRef.current;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const searchTerm = inputValue.trim();
    initialValueRef.current = searchTerm;
    onSearch(searchTerm);
  };

  const resetSearch = () => {
    setInputValue('');
    initialValueRef.current = '';
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
            <button
              aria-label="reset"
              type="reset"
              onClick={resetSearch}
              className={styles.resetButton}
            >
              <SpriteIcon id="close" size={16} />
            </button>
          )}
        </div>

        <button type="submit" disabled={!isDirty} className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
}

import { screen } from '@testing-library/react';

import { STORAGE_KEYS } from '@/services/localStorage';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

import { SearchBar, type SearchBarProps } from './SearchBar';

const setupSearchBar = ({
  searchTerm,
  onSearch,
}: Partial<SearchBarProps> = {}) => {
  const onSearchMock = vi.fn();
  return {
    ...setupUserEvent(
      <SearchBar
        searchTerm={searchTerm || ''}
        onSearch={onSearch || onSearchMock}
      />
    ),
    input: screen.getByRole('textbox'),
    searchButton: screen.getByRole('button', { name: /search/i }),
    onSearchMock,
  };
};

describe('SearchBar Component', () => {
  const localStorageKey = `${STORAGE_KEYS.PREFIX}${STORAGE_KEYS.ANIME}`;
  const testString = 'test';

  describe('Rendering', () => {
    it('should render search input and search button', () => {
      const { input, searchButton } = setupSearchBar();

      expect(input).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });

    it('should display saved search term from localStorage on mount', () => {
      const storageValue = localStorage.getItem(localStorageKey) || '';
      const { input } = setupSearchBar({
        searchTerm: storageValue,
      });

      expect(input).toHaveValue(storageValue);
    });

    it('should show empty input when no saved term exists', () => {
      const { input } = setupSearchBar();

      expect(input).toHaveValue('');
    });

    it('should show clear button only when input has value', () => {
      setupSearchBar({ searchTerm: testString });

      expect(
        screen.getByRole('button', { name: /reset/i })
      ).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should update input value when user types', async () => {
      const { input, user } = setupSearchBar();

      await user.type(input, testString);

      expect(input).toHaveValue(testString);
    });

    it('should save search term to localStorage when search button is clicked', async () => {
      const onSearchMock = vi.fn((term) =>
        localStorage.setItem(localStorageKey, term)
      );
      const { input, user, searchButton } = setupSearchBar({
        onSearch: onSearchMock,
      });

      await user.type(input, testString);
      await user.click(searchButton);

      expect(localStorage.getItem(localStorageKey)).toBe(testString);
    });

    it('should save trimmed search term to localStorage when submitted', async () => {
      const onSearchMock = vi.fn((term) =>
        localStorage.setItem(localStorageKey, term)
      );
      const { input, searchButton, user } = setupSearchBar({
        onSearch: onSearchMock,
      });

      await user.type(input, `  ${testString}  `);
      await user.click(searchButton);

      expect(localStorage.getItem(localStorageKey)).toBe(testString);
    });

    it('should trigger search callback with correct parameters', async () => {
      const { input, searchButton, user, onSearchMock } = setupSearchBar();

      await user.type(input, testString);
      await user.click(searchButton);

      expect(onSearchMock).toHaveBeenCalledOnce();
      expect(onSearchMock).toBeCalledWith(testString);
    });

    it('should enable search button when input changes', async () => {
      const { input, searchButton, user } = setupSearchBar();

      expect(searchButton).toBeDisabled();

      await user.type(input, testString);

      expect(searchButton).not.toBeDisabled();
    });

    it('should clear input when reset button is clicked', async () => {
      const { input, user, onSearchMock } = setupSearchBar({
        searchTerm: testString,
      });

      await user.click(screen.getByRole('button', { name: /reset/i }));

      expect(input).toHaveValue('');
      expect(onSearchMock).toBeCalledWith('');
    });
  });

  describe('LocalStorage Integration', () => {
    it('should retrieve saved search term on component mount', () => {
      localStorage.setItem(localStorageKey, testString);
      const { input } = setupSearchBar({
        searchTerm: localStorage.getItem(localStorageKey) || '',
      });

      expect(input).toHaveValue(testString);
    });

    it('should overwrite existing localStorage value on new search', async () => {
      localStorage.setItem(localStorageKey, 'prev value');
      const onSearchMock = vi.fn((term) =>
        localStorage.setItem(localStorageKey, term)
      );
      const { input, searchButton, user } = setupSearchBar({
        onSearch: onSearchMock,
      });

      await user.type(input, testString);
      await user.click(searchButton);

      expect(localStorage.getItem(localStorageKey)).toBe(testString);
    });
  });
});

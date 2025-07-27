import { screen } from '@testing-library/react';

import { SearchBar, type SearchBarProps } from '@/components/SearchBar/SearchBar';
import { setupUserEvent } from '@/test-utils/setupRender';

const mockedSearchTerm = 'test';

const setupSearchBar = ({ searchTerm, onSearch }: Partial<SearchBarProps> = {}) => {
  const onSearchMock = vi.fn();
  return {
    ...setupUserEvent(
      <SearchBar searchTerm={searchTerm || ''} onSearch={onSearch || onSearchMock} />
    ),
    input: screen.getByRole('textbox'),
    searchButton: screen.getByRole('button', { name: /search/i }),
    onSearchMock,
  };
};

describe('SearchBar Component', () => {
  afterEach(() => localStorage.clear());

  describe('Rendering', () => {
    it('should render search input and search button', () => {
      const { input, searchButton } = setupSearchBar();

      expect(input).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });

    it('should show empty input when no saved term exists', () => {
      const { input } = setupSearchBar();

      expect(input).toHaveValue('');
    });

    it('should show clear button only when input has value', () => {
      setupSearchBar({ searchTerm: mockedSearchTerm });

      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should update input value when user types', async () => {
      const { input, user } = setupSearchBar();

      await user.type(input, mockedSearchTerm);

      expect(input).toHaveValue(mockedSearchTerm);
    });

    it('should trigger search callback with a trimmed search ', async () => {
      const { input, searchButton, user, onSearchMock } = setupSearchBar();

      await user.type(input, mockedSearchTerm);
      await user.click(searchButton);

      expect(onSearchMock).toHaveBeenCalledOnce();
      expect(onSearchMock).toBeCalledWith(mockedSearchTerm);
    });

    it('should enable search button when input changes', async () => {
      const { input, searchButton, user } = setupSearchBar();

      expect(searchButton).toBeDisabled();

      await user.type(input, mockedSearchTerm);

      expect(searchButton).not.toBeDisabled();
    });

    it('should clear input when reset button is clicked', async () => {
      const { input, user, onSearchMock } = setupSearchBar({ searchTerm: mockedSearchTerm });

      await user.click(screen.getByRole('button', { name: /reset/i }));

      expect(input).toHaveValue('');
      expect(onSearchMock).toBeCalledWith('');
    });
  });
});

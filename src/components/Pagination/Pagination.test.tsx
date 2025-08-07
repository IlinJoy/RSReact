import { screen } from '@testing-library/react';

import { Pagination } from '@/components/Pagination/Pagination';
import type { PaginationType } from '@/models/paginationModel';
import { mockPagination } from '@/test-utils/mocks/mockData';
import { setupUserEvent } from '@/test-utils/setupRender';

const setupPagination = (pagination?: Partial<PaginationType>) => {
  const mockOnChange = vi.fn();

  return {
    ...setupUserEvent(
      <Pagination onChange={mockOnChange} pagination={{ ...mockPagination, ...pagination }} />
    ),
    mockOnChange,
    mockPagination,
  };
};

describe('Pagination Component', () => {
  describe('Rendering', () => {
    it('should display buttons and actual page information', () => {
      const { mockPagination } = setupPagination();

      expect(screen.getByLabelText('back')).toBeInTheDocument();
      expect(screen.getByLabelText('forward')).toBeInTheDocument();

      const currentPageText = `${mockPagination.current_page} of ${mockPagination.last_visible_page}`;
      expect(screen.getByText(currentPageText)).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should trigger callback on buttons click', async () => {
      const { user, mockOnChange } = setupPagination({ current_page: 2 });

      await user.click(screen.getByLabelText('back'));

      expect(mockOnChange).toBeCalled();
      expect(mockOnChange).toBeCalledWith(-1);

      await user.click(screen.getByLabelText('forward'));

      expect(mockOnChange).toBeCalled();
      expect(mockOnChange).toBeCalledWith(1);
    });

    it('should disable forward button on the last values', async () => {
      const { user, mockOnChange } = setupPagination({ current_page: 2, last_visible_page: 2 });
      const button = screen.getByLabelText('forward');

      await user.click(button);

      expect(button).toBeDisabled();
      expect(mockOnChange).not.toBeCalled();
    });

    it('should disable back button on the first values', async () => {
      const { user, mockOnChange } = setupPagination();
      const button = screen.getByLabelText('back');

      await user.click(button);

      expect(button).toBeDisabled();
      expect(mockOnChange).not.toBeCalled();
    });
  });
});

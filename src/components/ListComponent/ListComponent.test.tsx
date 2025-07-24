import { render, screen } from '@testing-library/react';

import { ListComponent } from './ListComponent';

const setupListComponent = (isLoading = true) => {
  return {
    ...render(<ListComponent data={[]} isLoading={isLoading || false} renderItem={vi.fn()} />),
  };
};

describe('List Component', () => {
  describe('Loading', () => {
    it('should show/hide based on loading prop', () => {
      const { rerender } = setupListComponent(false);

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      rerender(<ListComponent data={[]} isLoading renderItem={vi.fn()} />);

      expect(screen.queryByRole('status')).toBeInTheDocument();
    });

    it('should have appropriate ARIA labels for screen readers', () => {
      setupListComponent();

      expect(screen.queryByRole('status')).toHaveAttribute('aria-label', 'loading');
    });
  });
});

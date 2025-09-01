import { screen } from '@testing-library/react';

import { Header } from '@/components/Header/Header';
import { setupUserEvent } from '@/testUtils/setupRender';

const setupHeader = () => {
  return {
    ...setupUserEvent(<Header />),
  };
};

describe('Header Component', () => {
  describe('Opening/closing modal functionality', () => {
    it('should open modal when button is clicked', async () => {
      const { user } = setupHeader();

      await user.click(screen.getByRole('button', { name: /Open Uncontrolled/i }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onClose modal when background is clicked', async () => {
      const { user } = setupHeader();

      await user.click(screen.getByRole('button', { name: /Open Controlled/i }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

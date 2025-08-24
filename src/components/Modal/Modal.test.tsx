import { screen } from '@testing-library/react';

import { type DialogProps, Modal } from '@/components/Modal/Modal';
import { setupUserEvent } from '@/testUtils/setupRender';

const setupModal = (props: Partial<DialogProps>) => {
  const onClose = vi.fn();
  const content = <div data-testid="content">Modal Content</div>;
  return {
    onClose,
    ...setupUserEvent(
      <Modal onClose={onClose} title={props.title || 'Title'} rootContainer={props.rootContainer}>
        {props.children || content}
      </Modal>
    ),
  };
};

describe('Modal Component', () => {
  describe('Rendering', () => {
    it('should render modal', () => {
      setupModal({});

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should render modal in portal', () => {
      setupModal({});

      expect(document.body).toContainElement(screen.getByRole('dialog'));
    });
  });

  describe('Opening/closing functionality', () => {
    it('should call onClose modal when close button is clicked', async () => {
      const { onClose, user } = setupModal({});

      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose modal when background is clicked', async () => {
      const { onClose, user } = setupModal({});

      await user.click(screen.getByRole('dialog'));

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Accessibility ', () => {
    it('should be focused', () => {
      setupModal({});

      expect(screen.getByRole('dialog')).toHaveFocus();
    });

    it('should call onClose on esc', async () => {
      const { onClose, user } = setupModal({});

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalled();
    });
  });
});

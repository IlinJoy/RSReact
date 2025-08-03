import { screen } from '@testing-library/react';

import { Controls, type ControlsProps } from '@/components/FlyoutList/Controls/Controls';
import { setupUserEvent } from '@/test-utils/setupRender';

const setupControls = (props: Partial<ControlsProps> = {}) => {
  return {
    ...setupUserEvent(
      <Controls onDownload={vi.fn()} onListOpen={vi.fn()} totalAmount={0} {...props} />
    ),
  };
};

describe('Flyout Controls Component', () => {
  describe('Rendering', () => {
    it('should render total amount of chosen items', () => {
      const totalAmount = 10;
      setupControls({ totalAmount });

      expect(screen.getByLabelText(/total/i)).toHaveTextContent(totalAmount.toString());
    });

    it('should render all buttons and link for general view', () => {
      setupControls();

      expect(screen.getByRole('button', { name: /Open/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Remove/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Download/i)).toBeInTheDocument();
    });

    it('should not render open list button for modal view', () => {
      setupControls({ isModal: true });

      expect(screen.queryByRole('button', { name: /Open/i })).not.toBeInTheDocument();
    });
  });
});

describe('Download Handling', () => {
  it('should call open list callback on open button click', async () => {
    const mockOpenListCallback = vi.fn();
    const { user } = setupControls({ onListOpen: mockOpenListCallback });

    await user.click(screen.getByRole('button', { name: /Open/i }));

    expect(mockOpenListCallback).toHaveBeenCalledOnce();
  });

  it('should call download callback with link ref on link click', async () => {
    const mockDownloadCallback = vi.fn();
    const { user } = setupControls({ onDownload: mockDownloadCallback });

    await user.click(screen.getByLabelText(/Download/i));

    const callbackArgument = mockDownloadCallback.mock.calls[0][0];
    expect(mockDownloadCallback).toHaveBeenCalledOnce();
    expect(callbackArgument.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

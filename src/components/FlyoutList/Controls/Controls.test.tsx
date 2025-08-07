import { screen } from '@testing-library/react';

import { Controls, type ControlsProps } from '@/components/FlyoutList/Controls/Controls';
import { mockStoreItem } from '@/test-utils/mocks/mockStoreData';
import { setupUserEvent } from '@/test-utils/setupRender';

const mockedStoreItemsArr = [mockStoreItem, { ...mockStoreItem, id: 2 }];
const mockDownload = vi.fn();

vi.mock('@/hooks/useDownload', () => ({
  useDownload: vi.fn(() => ({
    download: mockDownload,
  })),
}));

const setupControls = (props: Partial<ControlsProps> = {}) => {
  return {
    ...setupUserEvent(
      <Controls CheckedItems={mockedStoreItemsArr} onListOpen={vi.fn()} {...props} />
    ),
  };
};

describe('Flyout Controls Component', () => {
  describe('Rendering', () => {
    it('should render total amount of chosen items', () => {
      setupControls();

      expect(screen.getByLabelText(/total/i)).toHaveTextContent(
        mockedStoreItemsArr.length.toString()
      );
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

  it('should initialize download on download click', async () => {
    const { user } = setupControls();

    await user.click(screen.getByLabelText(/Download/i));

    const mockDownloadArg = mockDownload.mock.calls[0][0];
    expect(mockDownload).toHaveBeenCalledOnce();
    expect(mockDownloadArg).toEqual(mockedStoreItemsArr);
  });
});

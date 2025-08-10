import { act, screen, within } from '@testing-library/react';

import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { addItem } from '@/store/slices/checkedItems/checkedItems';
import { type AppStore, setupStore } from '@/store/store';
import { mapAnime } from '@/store/utils';
import { db } from '@/test-utils/mocks/db';
import { mockStoreItems } from '@/test-utils/mocks/mockStoreData';
import { setupUserEvent } from '@/test-utils/setupRender';

const mockedUrl = 'test';

vi.stubGlobal('URL', {
  revokeObjectURL: vi.fn(),
  createObjectURL: vi.fn(() => mockedUrl),
});

describe('Flyout Component', () => {
  let mockedStore: AppStore;

  beforeEach(() => {
    mockedStore = setupStore();
  });

  describe('Render', () => {
    it('should render controls block with the right items amount', async () => {
      const { store } = setupUserEvent(<FlyoutList />, { store: mockedStore });

      expect(screen.getByLabelText(/Chosen items total amount/i)).toHaveTextContent('0');

      act(() => {
        store.dispatch(addItem(db.anime[0]));
        store.dispatch(addItem(db.anime[1]));
      });

      expect(await screen.findByLabelText(/Chosen items total amount/i)).toHaveTextContent('2');
    });

    describe('User Interaction', () => {
      it('should open modal on the open button click', async () => {
        const { user } = setupUserEvent(<FlyoutList />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /open list/i }));

        expect(await screen.findByRole('dialog')).toBeInTheDocument();
      });

      it('should hide modal on the close button click', async () => {
        const { user } = setupUserEvent(<FlyoutList />);

        await user.click(screen.getByRole('button', { name: /open list/i }));
        expect(await screen.findByRole('dialog')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /close/i }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      it('should show current chosen item list', async () => {
        const anime = db.anime[0];
        const chosenInfo = mapAnime(anime);
        const { user, store } = setupUserEvent(<FlyoutList />, { store: mockedStore });

        act(() => {
          store.dispatch(addItem(anime));
        });

        await user.click(screen.getByRole('button', { name: /open list/i }));

        const { getByText, getByRole } = within(await screen.findByRole('dialog'));
        const image = getByRole('img');

        expect(image).toHaveAttribute('src', chosenInfo.image);
        expect(getByText(chosenInfo.title, { exact: false })).toBeInTheDocument();
        expect(getByText(chosenInfo.episodes, { exact: false })).toBeInTheDocument();
      });

      it('should generate correct download link with a filename', async () => {
        mockedStore = setupStore({
          checkedItems: { ...mockStoreItems },
        });
        const { user, store } = setupUserEvent(<FlyoutList />, { store: mockedStore });
        const link = screen.getByTestId(/download/i);
        link.click = vi.fn();

        await user.click(screen.getByRole('button', { name: /download/i }));

        expect(link).toHaveAttribute('href', mockedUrl);
        expect(link).toHaveAttribute(
          'download',
          `${store.getState().checkedItems.ids.length}_items`
        );
      });
    });
  });
});

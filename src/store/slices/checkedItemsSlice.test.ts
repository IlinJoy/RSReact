import reducer, {
  addItem,
  initialState,
  removeAll,
  removeItem,
} from '@/store/slices/checkedItemsSlice';
import { mapAnime } from '@/store/utils';
import { generateMockData } from '@/test-utils/generateMockData';
import { mockStoreItem, mockStoreItems } from '@/test-utils/mocks/mockStoreData';

describe('checkedItemsSlice', () => {
  let previousState: typeof initialState;

  beforeEach(() => {
    previousState = { ...initialState };
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should add item to store', () => {
      const mockedAnime = generateMockData();
      const mockStoreItem = mapAnime(mockedAnime);

      expect(reducer(previousState, addItem(mockedAnime))).toEqual({
        ids: [mockedAnime.mal_id],
        entities: { [mockedAnime.mal_id]: mockStoreItem },
      });
    });

    it('should remove item from store', () => {
      previousState = { ...mockStoreItems };

      expect(reducer(previousState, removeItem(2))).toEqual({
        ids: [1],
        entities: { 1: mockStoreItem },
      });
    });

    it('should remove remove all from store', () => {
      previousState = { ...mockStoreItems };

      expect(reducer(previousState, removeAll())).toEqual(initialState);
    });
  });
});

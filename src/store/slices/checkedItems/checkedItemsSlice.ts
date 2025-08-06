import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { Anime } from '@/models/animeModel';
import type { CheckedItem } from '@/store/types';
import { mapAnime } from '@/store/utils';

export const checkedItemsAdapter = createEntityAdapter({
  selectId: (data: CheckedItem) => data.id,
});

export const initialState = checkedItemsAdapter.getInitialState();

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    addItem: {
      reducer: checkedItemsAdapter.addOne,
      prepare: (data: Anime) => ({ payload: mapAnime(data) }),
    },
    removeItem(state, action) {
      checkedItemsAdapter.removeOne(state, action.payload);
    },
    removeAll: () => {
      return initialState;
    },
  },
});

export const { addItem, removeItem, removeAll } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;

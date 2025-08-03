import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CheckedItemsState, PayloadAnimeAction } from '@store/types';

import type { Anime } from '@/models/animeModel';
import { mapAnime } from '@/store/utils';

export const initialState: CheckedItemsState = { data: [] };

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAnimeAction) => {
        state.data.push(action.payload);
      },
      prepare: (data: Anime) => ({ payload: mapAnime(data) }),
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state.data = [];
    },
  },
  selectors: {
    getItems: (sliceState) => sliceState.data,
  },
});

export const { addItem, removeItem, removeAll } = checkedItemsSlice.actions;
export const { getItems } = checkedItemsSlice.selectors;

export default checkedItemsSlice.reducer;

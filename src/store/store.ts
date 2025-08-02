import { configureStore } from '@reduxjs/toolkit';

import checkedItemsReducer from './slices';

export const store = configureStore({
  reducer: {
    checkedItems: checkedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

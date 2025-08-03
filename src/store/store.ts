import { combineReducers, configureStore } from '@reduxjs/toolkit';

import checkedItemsReducer from './slices/checkedItemsSlice';

const rootReducer = combineReducers({
  checkedItems: checkedItemsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

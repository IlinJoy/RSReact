import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { jikanApi } from '@/store/api/jikanApi';
import checkedItemsReducer from '@/store/slices/checkedItems/checkedItems';

const rootReducer = combineReducers({
  checkedItems: checkedItemsReducer,
  [jikanApi.reducerPath]: jikanApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jikanApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

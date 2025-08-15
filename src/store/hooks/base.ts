import { useDispatch, useStore } from 'react-redux';

import type { AppDispatch, AppStore } from '@/store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();

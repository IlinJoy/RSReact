import { isClient } from '@/constants/common';

export const getSearchString = () => (isClient ? window.location.search : '');

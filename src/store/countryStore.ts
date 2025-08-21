import { create } from 'zustand';

import { COUNTRIES } from '@/constants/countries';

type CountryStoreType = {
  countries: string[];
};

const initialState = {
  countries: COUNTRIES,
};

export const useCountryStore = create<CountryStoreType>(() => ({
  ...initialState,
}));

export const selectCountries = (state: CountryStoreType) => state.countries;

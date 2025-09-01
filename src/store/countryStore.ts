import { create } from 'zustand';

import { COUNTRIES } from '@/constants/countries';

type CountryStoreType = {
  countries: string[];
};

const useCountryStore = create<CountryStoreType>(() => ({
  countries: COUNTRIES,
}));

export const useCountries = () => useCountryStore((state: CountryStoreType) => state.countries);

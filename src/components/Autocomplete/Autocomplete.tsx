import { useRef, useState } from 'react';

import { FormInput } from '@/components/Input/Input';
import { selectCountries, useCountryStore } from '@/store/countryStore';
import { filterStringArray } from '@/utils/filterStringArray';

import styles from './Autocomplete.module.scss';

export function Autocomplete() {
  const countries = useCountryStore(selectCountries);
  const [isOpen, setIsOpen] = useState(false);
  const [suitableCountries, setSuitableCountries] = useState<string[]>(countries);

  const autocompleteRef = useRef<HTMLInputElement>(null);

  const handleCountryChange = (country: string) => {
    if (autocompleteRef.current) {
      autocompleteRef.current.value = country;
      handleInputChange(country);
    }
  };

  const handleInputChange = (query: string) => {
    setSuitableCountries(filterStringArray(countries, query));
  };

  return (
    <div className={styles.wrapper}>
      <FormInput
        name="country"
        label="Country"
        placeholder="Select country"
        ref={autocompleteRef}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {isOpen && !!suitableCountries.length && (
        <ul className={styles.suggestions}>
          {suitableCountries.map((country) => (
            <li
              key={country}
              className={styles.items}
              onMouseDown={() => handleCountryChange(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

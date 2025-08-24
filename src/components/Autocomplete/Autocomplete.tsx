import { type ChangeEvent, type ReactNode, type Ref, useRef, useState } from 'react';

import { useCountries } from '@/store/countryStore';
import { filterStringArray } from '@/utils/filterStringArray';

import styles from './Autocomplete.module.scss';

type AutocompleteProps = {
  onChange?: (query: string) => void;
  renderInput: (props: {
    ref: Ref<HTMLInputElement>;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
};

export function Autocomplete({ renderInput, onChange }: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const countries = useCountries();
  const [suitableCountries, setSuitableCountries] = useState<string[]>(countries);

  const autocompleteRef = useRef<HTMLInputElement>(null);

  const handleCountryChange = (country: string) => {
    if (autocompleteRef.current) {
      autocompleteRef.current.value = country;
      handleInputChange(country);
    }
  };

  const handleInputChange = (query: string) => {
    onChange?.(query);
    setSuitableCountries(filterStringArray(countries, query));
  };

  return (
    <div className={styles.wrapper}>
      {renderInput({
        ref: autocompleteRef,
        onFocus: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
        onChange: (e) => handleInputChange(e.target.value),
      })}

      {isOpen && !!suitableCountries?.length && (
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

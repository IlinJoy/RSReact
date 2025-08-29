import { type ReactNode } from 'react';

import { useCountries } from '@/store/countryStore';

type AutocompleteProps = {
  list: string;
  renderInput: (props: { list: string }) => ReactNode;
};

export function Autocomplete({ list, renderInput }: AutocompleteProps) {
  const countries = useCountries();

  return (
    <div>
      {renderInput({
        list,
      })}

      <datalist id={list} role="listbox">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </div>
  );
}

import { notFound } from 'next/navigation';

export const checkIsValidNumbersToQuery = (array: (string | undefined)[]) => {
  array.some((value) => {
    if (value && !/^[1-9][0-9]*$/.test(value)) {
      return notFound();
    }
  });
};

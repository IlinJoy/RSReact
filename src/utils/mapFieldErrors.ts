import type { ValidationError } from 'yup';

import { formSchema, type UserFormData } from '@/validation/formSchema';

export type ErrorState = {
  [K in keyof UserFormData]?: string[];
};

const isValidField = (field?: string): field is keyof UserFormData =>
  !!field && Object.keys(formSchema.fields).includes(field);

export const mapFieldErrors = (error: ValidationError) => {
  return error.inner.reduce<ErrorState>((acc, { path, message }) => {
    if (isValidField(path)) {
      acc[path] = acc[path] ? [...acc[path], message] : [message];
    }
    return acc;
  }, {});
};

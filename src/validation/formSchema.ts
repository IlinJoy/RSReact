import { boolean, type InferType, mixed, number, object, ref, string } from 'yup';

import { COUNTRIES } from '@/constants/countries';

const getRequiredMessage = (field: string) => `${field} is required`;

export const formSchema = object({
  name: string()
    .required(getRequiredMessage('Name'))
    .transform((value) => value.trim())
    .matches(/^[a-zA-Z0-9@$!%*?&#]+$/, 'English, please')
    .matches(/^[A-Z].*$/, 'Name must start with a capital letter'),

  age: number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required(getRequiredMessage('Age'))
    .positive('Age must be a positive integer'),

  email: string().email('Invalid email').required(getRequiredMessage('Email')),

  password: string()
    .required(getRequiredMessage('Password'))
    .transform((value) => value.trim())
    .matches(/^[a-zA-Z0-9@$!%*?&#]+$/, 'English, please')
    .matches(/[a-z]/, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/, 'Must contain at least 1 number')
    .matches(/[@$!%*?&#]/, 'Must contain at least 1 special character'),

  confirmPassword: string()
    .required(getRequiredMessage('Confirm password'))
    .transform((value) => value.trim())
    .oneOf([ref('password')], 'Should match password'),

  gender: string().required(getRequiredMessage('Gender')),

  country: string()
    .required(getRequiredMessage('Country'))
    .oneOf([...COUNTRIES, ''], 'Please select the country from the available list'),

  tc: boolean()
    .required(getRequiredMessage('Terms and Conditions agreement'))
    .oneOf([true], 'Please accept the terms'),

  image: mixed<File>()
    .required()
    .transform((value) => {
      return value instanceof FileList ? value.item(0) : value;
    })
    .test('required', getRequiredMessage('Image'), (value) => {
      return value && value.size > 0;
    })
    .test('fileType', 'Not a valid image type, only jpeg or png', (value) => {
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    })
    .test('fileSize', 'File size must be less than 1MB', (value) => {
      return value && value.size <= 1048576;
    }),
});

export type UserFormData = InferType<typeof formSchema>;

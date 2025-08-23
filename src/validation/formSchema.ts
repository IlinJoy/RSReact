import { boolean, type InferType, number, object, ref, string } from 'yup';

import { COUNTRIES } from '@/constants/countries';

const getRequiredMessage = (field: string) => `${field} is required`;

export const formSchema = object({
  name: string()
    .matches(/^[A-Z].*$/, 'Name must start with a capital letter')
    .required(getRequiredMessage('Name')),

  age: number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required(getRequiredMessage('Age'))
    .positive('Age must be a positive integer'),

  email: string().email('Invalid email').required(getRequiredMessage('Email')),

  password: string()
    .matches(/[@$!%*?&#]/, 'Must contain at least 1 special character')
    .matches(/[a-z]/, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/, 'Must contain at least 1 number')
    .required(getRequiredMessage('Password')),

  confirmPassword: string()
    .oneOf([ref('password')], 'Should match password')
    .required(getRequiredMessage('Confirm password')),

  gender: string().required(getRequiredMessage('Gender')),

  country: string()
    .required(getRequiredMessage('Country'))
    .oneOf([...COUNTRIES, ''], 'Please select the country from the available list'),

  tc: boolean()
    .required(getRequiredMessage('Terms and Conditions agreement'))
    .oneOf([true], 'Please accept the terms'),
});

export type UserFormData = InferType<typeof formSchema>;

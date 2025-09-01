import { screen } from '@testing-library/react';

export const getFormInputs = () => ({
  name: screen.getByRole('textbox', { name: /name/i }),
  age: screen.getByRole('spinbutton', { name: /age/i }),
  email: screen.getByRole('textbox', { name: /email/i }),
  country: screen.getByRole('combobox', { name: /country/i }),
  password: screen.getByLabelText(/^password/i),
  confirmPassword: screen.getByLabelText(/^confirm/i),
  fileInput: screen.getByLabelText(/Upload image/i),
  radioMale: screen.getByRole('radio', { name: /^male/i }),
  radioFemale: screen.getByRole('radio', { name: /female/i }),
  tc: screen.getByRole('checkbox', {
    name: /I agree to the Terms and Conditions/i,
  }),
});

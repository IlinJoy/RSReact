import type { UserEvent } from '@testing-library/user-event';

type Inputs = {
  name: HTMLElement;
  age: HTMLElement;
  email: HTMLElement;
  country: HTMLElement;
  password: HTMLElement;
  confirmPassword: HTMLElement;
  fileInput: HTMLElement;
  radioMale: HTMLElement;
  radioFemale: HTMLElement;
  tc: HTMLElement;
};

type FormMockData = Omit<Record<keyof Inputs, unknown>, 'radioMale' | 'radioFemale'>;

export const mockValidFormData: FormMockData = {
  name: 'Name',
  age: 1,
  email: 'mail@mail.com',
  country: 'Canada',
  password: 'Asd12!',
  confirmPassword: 'Asd12!',
  tc: true,
  fileInput: new File(['fileContent'], 'goodFile.jpeg', { type: 'image/jpeg' }),
} as const;

export const mockInvalidFormData: FormMockData = {
  name: 'name',
  age: -1,
  email: 'm',
  country: 'Bosnia',
  password: 'asd12!',
  confirmPassword: 'Asd12!',
  tc: false,
  fileInput: new File(['test'], 'badFile.txt', {
    type: 'text/plain',
  }),
} as const;

type UserFillForm = {
  user: UserEvent;
  data: FormMockData;
  inputs: Inputs;
  ignoreChecks?: boolean;
};

export async function userFillForm({ user, data, inputs, ignoreChecks }: UserFillForm) {
  for (const [inputName, input] of Object.entries(inputs)) {
    const inputValue = data[inputName as keyof FormMockData];

    if (input instanceof HTMLInputElement) {
      if ((input.type === 'checkbox' || input.type === 'radio') && !ignoreChecks) {
        await user.click(input);
      }

      if (input.type === 'file') {
        await user.upload(input, inputValue as File);
      }

      if (
        input.type === 'text' ||
        input.type === 'number' ||
        input.type === 'email' ||
        input.type === 'password'
      ) {
        await user.clear(input);
        await user.type(input, String(inputValue));
      }
    }
  }
}

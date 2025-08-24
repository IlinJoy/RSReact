import { screen, waitFor } from '@testing-library/react';

import { UncontrolledForm } from '@/components/Forms/UncontrolledForm';
import {
  mockInvalidFormData,
  mockValidFormData,
  userFillForm,
} from '@/testUtils/mocks/formDataMocks';
import { setupUserEvent } from '@/testUtils/setupRender';

const setupUncontrolledForm = () => {
  const onSubmit = vi.fn();
  return {
    ...setupUserEvent(<UncontrolledForm onSubmit={onSubmit} />),
    onSubmit,
    inputs: {
      name: screen.getByRole('textbox', { name: /name/i }),
      age: screen.getByRole('spinbutton', { name: /age/i }),
      email: screen.getByRole('textbox', { name: /email/i }),
      country: screen.getByRole('textbox', { name: /country/i }),
      password: screen.getByLabelText(/^password/i),
      confirmPassword: screen.getByLabelText(/^confirm/i),
      fileInput: screen.getByLabelText(/Upload image/i),
      radioMale: screen.getByRole('radio', { name: /^male/i }),
      radioFemale: screen.getByRole('radio', { name: /female/i }),
      tc: screen.getByRole('checkbox', {
        name: /I agree to the Terms and Conditions/i,
      }),
    },
    submitButton: screen.getByRole('button', { name: /submit/i }),
  };
};

describe('Uncontrolled Form Component', () => {
  describe('Rendering', () => {
    it('should render with all required fields', () => {
      const { submitButton, inputs } = setupUncontrolledForm();

      Object.values(inputs).forEach((input) => {
        expect(input).toBeInTheDocument();
      });

      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when inputs empty', async () => {
      const { user, submitButton } = setupUncontrolledForm();
      const inputValidationAmount = 8;

      await user.click(submitButton);

      expect(screen.getAllByRole('alert')).toHaveLength(inputValidationAmount);
    });

    it('should not show messages when input correct', async () => {
      const { user, submitButton, inputs } = setupUncontrolledForm();

      await userFillForm({ user, data: mockValidFormData, inputs });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryAllByRole('alert')).toHaveLength(0);
      });
    });
  });

  describe('User Interaction', () => {
    it('should validated field', async () => {
      const { user, submitButton, inputs } = setupUncontrolledForm();
      const inputValidationAmount = 8;

      await userFillForm({ user, data: mockInvalidFormData, inputs, ignoreChecks: true });
      await user.click(submitButton);

      expect(screen.queryAllByRole('alert')).toHaveLength(inputValidationAmount);
    });

    it('should validate password', async () => {
      const {
        user,
        submitButton,
        inputs: { password },
      } = setupUncontrolledForm();

      await user.type(password, 'A');
      await user.click(submitButton);

      expect(screen.getByText(/lowercase letter/i)).toBeInTheDocument();

      await user.type(password, 'a');
      await user.click(submitButton);

      expect(screen.getByText(/1 number/i)).toBeInTheDocument();

      await user.type(password, '1');
      await user.click(submitButton);

      expect(screen.getByText(/special character/i)).toBeInTheDocument();
    });

    it('should submit only when valid data', async () => {
      const { user, submitButton, inputs, onSubmit } = setupUncontrolledForm();

      await userFillForm({ user, data: mockValidFormData, inputs });

      await user.click(submitButton);

      expect(onSubmit).toHaveBeenCalled();
    });
  });
});

import type { ReactNode } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { FileInput } from '@/components/FileInput/FileInput';
import { FormInput } from '@/components/Input/Input';
import { PasswordInput } from '@/components/Password/PasswordInput';
import type { ErrorState } from '@/utils/mapFieldErrors';
import type { UserFormData } from '@/validation/formSchema';

import styles from './FormFields.module.scss';

type FormFieldsProps = {
  error: FieldErrors<UserFormData> | ErrorState;
  children: ReactNode;
  register?: UseFormRegister<UserFormData>;
};

export function FormFields({ error, children, register }: FormFieldsProps) {
  const isControlled = !!register;

  const getFieldProps = (fieldName: keyof UserFormData) =>
    isControlled ? register(fieldName) : { name: fieldName };

  return (
    <>
      <FormInput
        {...getFieldProps('name')}
        placeholder="Your name"
        label="First Name"
        error={error.name?.message}
      />
      <FormInput
        {...getFieldProps('age')}
        type="number"
        placeholder="Your age"
        label="Age"
        error={error.age?.message}
      />
      <FormInput
        {...getFieldProps('email')}
        type="email"
        placeholder="Email"
        label="Email"
        error={error.email?.message}
      />

      {children}

      <fieldset className={styles.fieldset}>
        <legend>Enter password</legend>
        <PasswordInput
          withIndicator
          renderInput={(props) => (
            <FormInput
              {...getFieldProps('password')}
              label="Password"
              placeholder="Choose Password"
              error={error.password?.message}
              {...props}
            />
          )}
        />
        <PasswordInput
          renderInput={(props) => (
            <FormInput
              {...getFieldProps('confirmPassword')}
              label="Confirmation"
              placeholder="Confirm Password"
              error={error.confirmPassword?.message}
              {...props}
            />
          )}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Choose you gender</legend>
        <FormInput {...getFieldProps('gender')} type="radio" id="male" label="Male" value="male" />
        <FormInput
          {...getFieldProps('gender')}
          type="radio"
          id="female"
          label="Female"
          value="female"
        />
        {error.gender && <p className={styles.error}>{error.gender.message}</p>}
      </fieldset>

      <FileInput
        renderInput={(props) => (
          <FormInput
            {...getFieldProps('image')}
            label="Upload image"
            error={error.image?.message}
            {...props}
          />
        )}
      />

      <FormInput
        {...getFieldProps('tc')}
        type="checkbox"
        label="I agree to the Terms and Conditions"
        value="true"
        error={error.tc?.message}
      />
    </>
  );
}

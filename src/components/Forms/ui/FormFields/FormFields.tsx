import type { ReactNode } from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';

import { FormInput } from '@/components/Input/Input';
import type { ErrorState } from '@/utils/mapFieldErrors';
import type { UserFormData } from '@/validation/formSchema';

import styles from './FormFields.module.scss';

type FormFieldsProps = {
  error: FieldErrors<UserFormData> | ErrorState;
  children: ReactNode;
};

export function FormFields({ error, children }: FormFieldsProps) {
  const formContext = useFormContext();
  const isControlled = formContext;

  const getFieldProps = (fieldName: keyof UserFormData) =>
    isControlled ? formContext.register(fieldName) : { name: fieldName };

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
        <FormInput
          {...getFieldProps('password')}
          label="Password"
          type="password"
          placeholder="Choose Password"
          error={error.password?.message}
        />
        <FormInput
          {...getFieldProps('confirmPassword')}
          label="Confirmation"
          type="password"
          placeholder="Confirm Password"
          error={error.confirmPassword?.message}
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
      {/* {input control to upload picture} */}
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

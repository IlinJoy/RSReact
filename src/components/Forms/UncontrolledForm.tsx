import { type FormEvent, useRef, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { FormInput } from '@/components/Input/Input';
import type { UserFormData } from '@/constants/types';
import styles from './UncontrolledForm.module.scss';

export function UncontrolledForm() {
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      console.log(Object.fromEntries(formData));
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FormInput
        name="firstName"
        placeholder="Your name"
        label="First Name"
        error={errors.firstName}
      />
      <FormInput name="age" placeholder="Your age" label="Age" error={errors.firstName} />
      <FormInput name="email" type="email" placeholder="Email" label="Email" error={errors.age} />
      <fieldset className={styles.fieldset}>
        <legend>Enter password</legend>
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Choose Password"
          error={errors.password}
        />
        <FormInput
          name="confirmPassword"
          label="Confirmation"
          type="password"
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />
        {/* {autocomplete control to select country (all countries should be stored in the Redux store) Form should contain labels, which should be connected with inputs (look at htmlFor)} */}
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Choose you gender</legend>
        <FormInput name="gender" type="radio" id="male" label="Male" value="male" />
        <FormInput name="gender" type="radio" id="female" label="Female" value="female" />
        {errors.gender && <p>{errors.gender}</p>}
      </fieldset>
      {/* {input control to upload picture} */}
      <FormInput name="tc" type="checkbox" label="I agree to the Terms and Conditions" />
      <div className={styles.formButtons}>
        <Button className={styles.reset}> Reset</Button>
        <Button> Submit</Button>
      </div>
    </form>
  );
}

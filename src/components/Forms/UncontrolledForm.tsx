import { type FormEvent, useState } from 'react';
import { ValidationError } from 'yup';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { Button } from '@/components/Button/Button';
import { FormInput } from '@/components/Input/Input';
import { type ErrorState, mapFieldErrors } from '@/utils/mapFieldErrors';
import { formSchema } from '@/validation/formSchema';

import styles from './UncontrolledForm.module.scss';

export function UncontrolledForm() {
  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      console.log(Object.fromEntries(formData));
      formSchema.validateSync(Object.fromEntries(formData), { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(mapFieldErrors(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <FormInput name="name" placeholder="Your name" label="First Name" errors={errors.name} />
      <FormInput name="age" type="number" placeholder="Your age" label="Age" errors={errors.age} />
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        errors={errors.email}
      />
      <Autocomplete
        renderInput={(props) => (
          <FormInput
            name="country"
            label="Country"
            placeholder="Select country"
            errors={errors.country}
            {...props}
          />
        )}
      />
      <fieldset className={styles.fieldset}>
        <legend>Enter password</legend>
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Choose Password"
          errors={errors.password}
          withStrength
        />
        <FormInput
          name="confirmPassword"
          label="Confirmation"
          type="password"
          placeholder="Confirm Password"
          errors={errors.confirmPassword}
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Choose you gender</legend>
        <FormInput name="gender" type="radio" id="male" label="Male" value="male" />
        <FormInput name="gender" type="radio" id="female" label="Female" value="female" />
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </fieldset>
      {/* {input control to upload picture} */}
      <FormInput
        name="tc"
        type="checkbox"
        label="I agree to the Terms and Conditions"
        value="true"
        errors={errors.tc}
      />
      <div className={styles.formButtons}>
        <Button className={styles.reset}> Reset</Button>
        <Button> Submit</Button>
      </div>
    </form>
  );
}

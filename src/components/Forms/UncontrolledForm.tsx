import { type FormEvent, useState } from 'react';
import { ValidationError } from 'yup';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import { PasswordInput } from '@/components/Password/PasswordInput';
import { useStrength } from '@/hooks/useStrength';
import type { InfoOutput } from '@/store/infoOutputStore';
import { convertToBase64 } from '@/utils/convertToBase64';
import { type ErrorState, mapFieldErrors } from '@/utils/mapFieldErrors';
import { formSchema } from '@/validation/formSchema';

import styles from './ui/FormFields/FormFields.module.scss';

type UncontrolledFormProps = {
  onSubmit: (data: InfoOutput) => void;
};

export function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const [errors, setErrors] = useState<ErrorState>({});
  const { strength, updateStrength } = useStrength();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      updateStrength(formData.get('password')?.toString() || '');

      const { image, ...validatedData } = formSchema.validateSync(data, { abortEarly: false });
      const convertedImage = await convertToBase64(image);

      onSubmit({ ...validatedData, image: convertedImage, form: 'uncontrolled' });
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(mapFieldErrors(error));
      }
    }
  };

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="on" noValidate>
      <FormFields error={errors}>
        <Autocomplete
          renderInput={(props) => (
            <FormInput
              name="country"
              label="Country"
              placeholder="Select country"
              error={errors.country?.message}
              {...props}
            />
          )}
        />
        <fieldset className={styles.fieldset}>
          <legend>Enter password</legend>
          <PasswordInput
            renderInput={(props) => (
              <FormInput
                name="password"
                label="Password"
                placeholder="Choose Password"
                error={errors.password?.message}
                strength={strength}
                {...props}
              />
            )}
          />
          <PasswordInput
            renderInput={(props) => (
              <FormInput
                name="confirmPassword"
                label="Confirmation"
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                {...props}
              />
            )}
          />
        </fieldset>
      </FormFields>

      <FormButtons disabled={false} />
    </form>
  );
}

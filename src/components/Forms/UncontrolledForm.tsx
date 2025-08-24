import { type FormEvent, useState } from 'react';
import { ValidationError } from 'yup';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import type { InfoOutput } from '@/store/infoOutputStore';
import { convertToBase64 } from '@/utils/convertToBase64';
import { type ErrorState, mapFieldErrors } from '@/utils/mapFieldErrors';
import { formSchema } from '@/validation/formSchema';

type UncontrolledFormProps = {
  onSubmit: (data: InfoOutput) => void;
};

export function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
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
    <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="on">
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
      </FormFields>

      <FormButtons active={true} />
    </form>
  );
}

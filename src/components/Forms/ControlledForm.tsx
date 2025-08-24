import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import type { InfoOutput } from '@/store/infoOutputStore';
import { convertToBase64 } from '@/utils/convertToBase64';
import { formSchema, type UserFormData } from '@/validation/formSchema';

type ControlledFormProps = {
  onSubmit: (data: InfoOutput) => void;
};

export const formDefaultValues = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  country: '',
  tc: false,
  image: undefined,
};

export function ControlledForm({ onSubmit }: ControlledFormProps) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });

  const submitHandler = async ({ image, ...data }: UserFormData) => {
    const convertedImage = await convertToBase64(image);
    onSubmit({ ...data, form: 'controlled', image: convertedImage });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} onReset={() => reset()} autoComplete="on">
      <FormFields error={errors} register={register}>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange } }) => (
            <Autocomplete
              onChange={onChange}
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
          )}
        />
      </FormFields>
      <FormButtons disabled={!isValid} />
    </form>
  );
}

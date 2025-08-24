import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import type { InfoOutput } from '@/store/infoOutputStore';
import { formSchema, type UserFormData } from '@/validation/formSchema';

type ControlledFormProps = {
  onSubmit: (data: InfoOutput) => void;
};

export function ControlledForm({ onSubmit }: ControlledFormProps) {
  const methods = useForm<UserFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const submitHandler = (data: UserFormData) => {
    onSubmit({ ...data, form: 'controlled' });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)} onReset={() => reset()} autoComplete="on">
        <FormFields error={errors}>
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
        <FormButtons active={isValid} />
      </form>
    </FormProvider>
  );
}

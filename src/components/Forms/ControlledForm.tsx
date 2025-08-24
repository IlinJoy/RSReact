import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import { PasswordInput } from '@/components/Password/PasswordInput';
import { useStrength } from '@/hooks/useStrength';
import type { InfoOutput } from '@/store/infoOutputStore';
import { convertToBase64 } from '@/utils/convertToBase64';
import { formSchema, type UserFormData } from '@/validation/formSchema';

import styles from './ui/FormFields/FormFields.module.scss';

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
    watch,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });

  const passwordValue = watch('password');
  const { strength, updateStrength } = useStrength();

  useEffect(() => {
    if (passwordValue) {
      updateStrength(passwordValue);
    }
  }, [passwordValue, updateStrength]);

  const submitHandler = async ({ image, ...data }: UserFormData) => {
    const convertedImage = await convertToBase64(image);
    onSubmit({ ...data, form: 'controlled', image: convertedImage });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      onReset={() => reset()}
      autoComplete="on"
      noValidate
    >
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
        <fieldset className={styles.fieldset}>
          <legend>Enter password</legend>
          <PasswordInput
            renderInput={(props) => (
              <FormInput
                {...register('password')}
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
                {...register('confirmPassword')}
                label="Confirmation"
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                {...props}
              />
            )}
          />
        </fieldset>
      </FormFields>
      <FormButtons disabled={!isValid} />
    </form>
  );
}

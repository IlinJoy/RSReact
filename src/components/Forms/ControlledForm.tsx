import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormButtons } from '@/components/Forms/ui/FormButtons/FormButtons';
import { FormBaseFields } from '@/components/Forms/ui/FormFields/FormFields';
import { FormInput } from '@/components/Input/Input';
import { PasswordInput } from '@/components/Password/PasswordInput';
import { useStrength } from '@/hooks/useStrength';
import type { InfoOutput } from '@/store/infoOutputStore';
import { convertToBase64 } from '@/utils/convertToBase64';
import { withId } from '@/utils/withId';
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
    onSubmit(withId({ ...data, form: 'controlled', image: convertedImage }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} onReset={() => reset()} noValidate>
      <FormBaseFields error={errors} register={register}>
        <fieldset className={styles.fieldset}>
          <legend>Enter password</legend>
          <PasswordInput
            renderInput={(props) => (
              <FormInput
                {...register('password')}
                label="Password"
                placeholder="Choose Password"
                strength={strength}
                autoComplete="new-password"
                error={errors.password?.message}
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
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...props}
              />
            )}
          />
        </fieldset>
      </FormBaseFields>
      <FormButtons disabled={!isValid} />
    </form>
  );
}

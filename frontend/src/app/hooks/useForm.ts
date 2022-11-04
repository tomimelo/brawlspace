import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export const useForm = <T>(initialForm: T, formValidations: any) => {
  const [formState, setFormState] = useState<any>(initialForm);
  const [formValidation, setFormValidation] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    createValidators();
  });

  const createValidators = () => {
    const formCheckedValues: { [key: string]: string } = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  const isFormValid = useMemo((): boolean => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};

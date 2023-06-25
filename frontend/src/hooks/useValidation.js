import React from 'react';

export function useValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleUpdate = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  }
  const resetForm = React.useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid)
  },
    [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, handleUpdate, resetForm, setValues };
}

export function useUpdateForm() {
  const [values, setValues] = React.useState({});

  const handleUpdate = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    setValues({ ...values, [name]: value })
  }

  return { values, handleUpdate, setValues };
}
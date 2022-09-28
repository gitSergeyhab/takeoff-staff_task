import { ChangeEvent } from 'react';

type CreateHandlerType = {
  evt: ChangeEvent<HTMLInputElement>,
  setValue: (x: string) => void,
  setError: (x: boolean) => void,
  setLabel: (x: string) => void,
  setHelper: (x: string) => void,
  checkValue: (x: string) => boolean,
  helperText: string
}

export const createHandler = ({evt, setValue, setError, setLabel, setHelper, checkValue, helperText} : CreateHandlerType) => {
  const value = evt.currentTarget.value;
  if (value) {
    setValue(value);
    setError(!checkValue(value));
    setLabel(checkValue(value) ? '' : 'Error');
    setHelper(checkValue(value) ? '' : helperText);
  } else {
    setValue('');
    setError(false);
    setLabel('');
    setHelper('');
  }
};

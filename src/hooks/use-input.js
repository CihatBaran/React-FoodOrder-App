import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT_CHANGE') {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === 'INPUT_RESET') {
    return {
      value: '',
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatchInputState] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatchInputState({ type: 'INPUT_CHANGE', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatchInputState({ type: 'INPUT_BLUR' });
  };

  const reset = () => {
    dispatchInputState({ type: 'INPUT_RESET' });
  };

  return {
    inputValue: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

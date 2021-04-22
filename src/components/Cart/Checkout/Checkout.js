import React, { useContext } from 'react';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import CartContext from '../../../store/cart-context';
import classes from './Checkout.module.css';
import Spinner from '../../UI/Spinner';

/**
 * Helper Function
 */
const validateGeneralInputParam = (value) => value.trim() !== '';
const validateSpesificInputParam = (value) => {
  const charValidation = (val) => {
    return /\d/.test(val);
  };
  return value.length > 5 && charValidation(value);
};

const invalidValidInputStyle = (hasError) => {
  if (hasError) {
    return `${classes['form__control']} ${classes['invalid']}`;
  } else {
    return classes['form__control'];
  }
};

const Checkout = (props) => {
  /**
   * Context API
   */
  const cartCtx = useContext(CartContext);
  /**
   * Custom Hook
   */
  const {
    hasError,
    isLoading,
    serverData,
    sendRequest: confirmOrder,
  } = useHttp();

  const {
    inputValue: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateGeneralInputParam);

  const {
    inputValue: enteredStreetName,
    isValid: enteredStreetNameIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(validateSpesificInputParam);

  const {
    inputValue: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeResetInput,
  } = useInput(validateSpesificInputParam);

  const {
    inputValue: enteredCity,
    valueChangeHandler: cityChangeHandler,
    reset: cityInputResetHandler,
  } = useInput(() => true);

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredStreetNameIsValid &&
    enteredPostalCodeIsValid
  ) {
    formIsValid = true;
  }

  const nameInputClasses = invalidValidInputStyle(nameInputHasError);

  const streetInputClasses = invalidValidInputStyle(streetInputHasError);

  const postalCodeInputClasses = invalidValidInputStyle(postalCodeHasError);

  /**
   * Handler Functions
   * @param {*} event
   */
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const data = {
      name: enteredName,
      street: enteredStreetName,
      postalCode: enteredPostalCode,
      city: enteredCity,
      order: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    };

    confirmOrder({
      url:
        'https://react-food-order-app-default-rtdb.firebaseio.com/orders.json',
      method: 'post',
      body: data,
    });

    resetNameInput();
    resetStreetInput();
    postalCodeResetInput();
    cityInputResetHandler();
    if (serverData !== '') {
      cartCtx.clearItem();
      props.onConfirm();
    }
  };

  let content = '';
  let statusText = '';

  if (isLoading) {
    content = <Spinner />;
  }
  if (hasError === '' && serverData !== null) {
    statusText = (
      <p style={{ marginTop: '1rem', color: 'green' }}>
        Delicious meals are being prepared...
      </p>
    );
  }
  if (hasError) {
    statusText = <p>Something wrong :( {hasError}</p>;
  }

  return (
    <React.Fragment>
      <form onSubmit={formSubmissionHandler} className={classes.form}>
        <div className={nameInputClasses}>
          <label htmlFor='name'>Your name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={enteredName}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && (
            <p className={classes['error-text']}>Please enter your name</p>
          )}
        </div>

        <div className={streetInputClasses}>
          <label htmlFor='street'>Street</label>
          <input
            type='text'
            name='street'
            id='street'
            value={enteredStreetName}
            onChange={streetChangedHandler}
            onBlur={streetBlurHandler}
          />
          {streetInputHasError && (
            <p className={classes['error-text']}>
              Please enter street with unit number
            </p>
          )}
        </div>

        <div className={postalCodeInputClasses}>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            name='postalCode'
            id='postalCode'
            value={enteredPostalCode}
            onChange={postalCodeChangedHandler}
            onBlur={postalCodeBlurHandler}
          />

          {postalCodeHasError && (
            <p className={classes['error-text']}>
              Please enter valid postal code
            </p>
          )}
        </div>

        <div className={classes['form__control']}>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            id='city'
            value={enteredCity}
            onChange={cityChangeHandler}
          />
        </div>

        <button
          onClick={props.onCancel}
          className={`${classes['btn']} ${classes['btn--light']}`}
        >
          Cancel
        </button>

        <button
          type='submit'
          disabled={!formIsValid}
          className={`${classes['btn']} ${classes['btn--dark']}`}
        >
          Confirm
        </button>
      </form>
      {content}
      {statusText}
    </React.Fragment>
  );
};

export default Checkout;

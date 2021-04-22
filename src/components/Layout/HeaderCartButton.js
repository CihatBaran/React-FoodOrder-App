import React, { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './../../css/style.module.css';

const HeaderCartButton = (props) => {
  const [btnBumped, setBtnBumped] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  /**
   * if items chanes then bump the header to inform the user
   * HOOKS_useEffect
   */
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBumped(true);

    const timer = setTimeout(() => {
      setBtnBumped(false);
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  let btnClass = `${classes.button}`;
  if (btnBumped) {
    btnClass = `${classes.button} animate__animated animate__bounceOut`;
  }

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

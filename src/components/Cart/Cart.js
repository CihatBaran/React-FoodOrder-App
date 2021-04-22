import classes from './../../css/style.module.css';
import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout/Checkout';

const Cart = (props) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const cartCtx = useContext(CartContext);

  const amount = `$${(cartCtx.totalAmount / 1.13).toFixed(2)}`;
  const hst = `$${(cartCtx.totalAmount * 0.13).toFixed(2)}`;
  const totalAmount = `$${(cartCtx.totalAmount * 1.13).toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const orderHandler = () => {
    setIsCheckedOut(true);
  };

  const confirmedHandler = () => {
    setOrderConfirmed(true);
  };

  let message = '';
  if (orderConfirmed) {
    message = (
      <p style={{ color: '#fff', backgroundColor: 'green', padding: '1rem' }}>
        Order successfully completed....
      </p>
    );
  }

  return (
    <Modal onHideCard={props.onHideCard}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes['cart-items__total']}>
        <span>Amount</span>
        <span>{amount}</span>
      </div>
      <div className={classes['cart-items__total']}>
        <span>HST</span>
        <span>{hst}</span>
      </div>
      <div className={classes['cart-items__total']}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {message}
      {isCheckedOut && (
        <React.Fragment>
          <hr />
          <Checkout onCancel={props.onHideCard} onConfirm={confirmedHandler} />
        </React.Fragment>
      )}
      {!isCheckedOut && (
        <div className={classes['cart-items__actions']}>
          <button className={classes['button--alt']} onClick={props.onHideCard}>
            Close
          </button>
          {hasItems && (
            <button className={classes['button']} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;

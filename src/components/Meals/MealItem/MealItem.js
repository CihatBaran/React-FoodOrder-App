import React, { useContext } from 'react';
import classes from '../../../css/style.module.css';
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const item = {
      amount: amount,
      id: props.id,
      name: props.name,
      price: props.price,
    };
    cartCtx.addItem(item);
  };

  return (
    <li className={classes['meal-item__meal']}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes['meal-item__description']}>
          {props.description}
        </div>
        <div className={classes['meal-item__price']}>{price}</div>
      </div>
      <MealItemForm incrementID={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;

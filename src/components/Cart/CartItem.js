import classes from '../../css/style.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes['cart-item__summary']}>
          <span className={classes['cart-item__price']}>{price}</span>
          <span className={classes['cart-item__amount']}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes['cart-item__actions']}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;

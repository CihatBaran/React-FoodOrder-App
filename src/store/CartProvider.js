import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    /**
     * if we already have that item, then don't add instead add it to
     * existing items list by increasing the amount
     */
    let flag = true;
    let updatedItems = state.items.map((item) => {
      if (item.id === action.item.id) {
        flag = false;
        const replaceItem = action.item;
        replaceItem.amount += item.amount;
        return replaceItem;
      }
      return item;
    });

    if (flag) {
      updatedItems = state.items.concat(action.item);
    }
    /**
     * Update Total Amount
     */
    const updatedTotalAmount = updatedItems.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);

    return { items: updatedItems, totalAmount: updatedTotalAmount * 1.13 };
  }

  if (action.type === 'REMOVE_ITEM') {
    let flag = false;

    /**
     * Remove Item amount based on given id
     */
    const updatedItems = state.items.map((item) => {
      if (item.id === action.id) {
        const updatedItem = item;
        updatedItem.amount = item.amount - 1;
        if (updatedItem.amount <= 0) {
          flag = true;
        }
        return updatedItem;
      }
      return item;
    });

    /**
     * if any amount is less than 1 than delete from arr
     */
    if (flag) {
      const index = updatedItems.findIndex((item) => {
        return item.amount < 1;
      });
      updatedItems.splice(index, 1);
    }
    /**
     * Update total amount
     */
    const updatedTotalAmount = updatedItems.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);

    return { items: updatedItems, totalAmount: updatedTotalAmount * 1.13 };
  }

  if (action.type === 'CLEAR_ITEM') {
    return defaultCartState;
  }

  return defaultCartState;
};

/**
 * MAIN_COMPONENT
 * @param {*} props
 * @returns
 */
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToChart = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemFromChart = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const clearItem = () => {
    dispatchCartAction({ type: 'CLEAR_ITEM' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToChart,
    removeItem: removeItemFromChart,
    clearItem: clearItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cardIsShown, setCardIsShown] = useState(false);

  const showCardHandler = () => {
    setCardIsShown(true);
  };

  const hideCardHandler = () => {
    setCardIsShown(false);
  };

  return (
    <CartProvider>
      {cardIsShown && <Cart onHideCard={hideCardHandler} />}

      <Header onShowCard={showCardHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import React from 'react';

import classes from './../../css/style.module.css';
import MEALS_IMAGE from './../../assets/meals.jpg';

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCard}>Cart</HeaderCartButton>
      </header>

      <div className={classes['main-image']}>
        <img src={MEALS_IMAGE} alt='Food Table' />
      </div>
    </React.Fragment>
  );
};

export default Header;

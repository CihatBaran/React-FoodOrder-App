import React, { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';
import classes from './../../css/style.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const {
    hasError,
    isLoading,
    serverData,
    sendRequest: fetchMealsData,
  } = useHttp();

  useEffect(() => {
    // This is javascript comments
    const config = {
      url: 'https://react-food-order-app2-default-rtdb.firebaseio.com/meals.json',
    };
    fetchMealsData(config);
  }, [fetchMealsData]);

  let mealsList = '';
  if (serverData) {
    let mealArray = [];
    for (let key in serverData) {
      mealArray.push({
        id: key,
        name: serverData[key].name,
        price: serverData[key].price,
        description: serverData[key].description,
      });
    }

    mealsList = mealArray.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          name={meal.name}
          price={+meal.price}
          description={meal.description}
          id={meal.id}
        />
      );
    });
  }

  let content = mealsList;

  if (isLoading) {
    content = (
      <div className={classes['lds-spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const mealsListClassName = isLoading ? classes['ul-center'] : '';

  return (
    <section className={classes['available-meals__meals']}>
      <Card>
        {hasError && <p style={{ color: '#F61F1F' }}>{hasError}</p>}
        <ul className={mealsListClassName}>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

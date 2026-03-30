import type { IBasketState, IDish, IBasket } from '../types';

export const addDishToBasket = (currentState: IBasketState, dish: IDish): IBasketState => {
  const existingItemIndex = currentState.items.findIndex(item => item.dish.id === dish.id);

  let newItems: IBasket[];

  if (existingItemIndex !== -1) {
    newItems = currentState.items.map((item, index) => {
      if (index === existingItemIndex) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
  } else {
    newItems = [...currentState.items, { dish, count: 1 }];
  }

  return recalc(newItems);
};

export const increaseDishCount = (state: IBasketState, dishId: string): IBasketState => {
  const newItems = state.items.map(item =>
    item.dish.id === dishId
      ? { ...item, count: item.count + 1 }
      : item
  );

  return recalc(newItems);
};

export const decreaseDishCount = (state: IBasketState, dishId: string): IBasketState => {
  const newItems = state.items
    .map(item =>
      item.dish.id === dishId
        ? { ...item, count: item.count - 1 }
        : item
    )
    .filter(item => item.count > 0);

  return recalc(newItems);
};

const recalc = (items: IBasket[]): IBasketState => {
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.count * item.dish.price, 0);

  return {
    items,
    totalCount,
    totalPrice
  };
};
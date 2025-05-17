import { state } from './store';
import { ActionTypes } from './action';

export function reducer(action: any) {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      state.products = action.payload;
      break;
    case ActionTypes.ADD_TO_CART:
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
    case ActionTypes.REMOVE_FROM_CART:
      state.cart = state.cart.filter((p: any) => p.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
    case ActionTypes.SET_CART:
      state.cart = action.payload;
      break;
  }
}
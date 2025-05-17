import { fetchProducts } from './components/utils/chache';
import { dispatch } from './flux/dispatcher';
import { ActionTypes } from './flux/action';
import '../src/components/productlist';
import '../src/components/cart';

async function init() {
  const products = await fetchProducts('https://fakestoreapi.com/products', 'StaleWhileRevalidate');
  dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products });
}

init();
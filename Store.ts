import dispatcher, { Action } from "./Dispatcher";
import { Product } from "../Root/types";

type AppState = {
  products: Product[];
  cart: Product[]; 
};

const initialState: AppState = {
  products: [],
  cart: [],
};

class ProductStore {
  private state: AppState = initialState;
  private listeners: (() => void)[] = [];

  constructor() {
    console.log('Estado inicial:', this.state);
    dispatcher.register(this.handleActions.bind(this));
    this.loadCartFromStorage(); 
  }

  private loadCartFromStorage() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.state.cart = JSON.parse(cart); 
    }
  }

  private emitChange() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart)); 
    for (const listener of this.listeners) {
      listener(); 
    }
  }

  private handleActions(action: Action) {
    switch (action.type) {
      case "SET_PRODUCTS":
        this.state.products = action.payload; 
        this.emitChange();
        break;
      case "BUY_PRODUCT":
        this.state.cart.push(action.payload); 
        this.emitChange();
        break;
      case "REMOVE_PRODUCT":
        this.state.cart = this.state.cart.filter(
          (p) => p.id !== action.payload 
        );
        this.emitChange();
        break;
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener); 
  }

  unsubscribe(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener); 
  }

  getState(): AppState {
    return this.state; 
  }
}

const store = new ProductStore(); 
export default store; 

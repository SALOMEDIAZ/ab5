import { state } from '../flux/store';
import { dispatch } from '../flux/dispatcher';
import { ActionTypes } from '../flux/action';

class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    document.addEventListener('stateChanged', () => this.render());
    document.addEventListener('productsUpdated', (e: any) => {
      dispatch({ type: ActionTypes.SET_PRODUCTS, payload: e.detail });
    });
  }

  render() {
    const html = state.products.map((product: any) => `
      <div style="border:1px solid #ccc;padding:1rem;margin:1rem">
        <h3>${product.title}</h3>
        <img src="${product.image}" width="100">
        <p>${product.price} USD</p>
        <button data-id="${product.id}">Agregar</button>
      </div>
    `).join('');

    this.shadowRoot!.innerHTML = html;
    this.shadowRoot!.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        const product = state.products.find((p: any) => p.id === id);
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
      });
    });
  }
}
customElements.define('product-list', ProductList);
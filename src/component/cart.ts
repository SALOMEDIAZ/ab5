import { state } from '../flux/store';
import { dispatch } from '../flux/dispatcher';
import { ActionTypes } from '../flux/action';

class Cart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    document.addEventListener('stateChanged', () => this.render());
  }

  render() {
    if (!state.cart.length) {
      this.shadowRoot!.innerHTML = '<p>Carrito vacío</p>';
      return;
    }
    const html = state.cart.map((item: any) => `
      <div style="border:1px dashed #999;padding:0.5rem;margin:0.5rem">
        <strong>${item.title}</strong> - ${item.price} USD
        <button data-id="${item.id}">Eliminar</button>
      </div>
    `).join('');

    this.shadowRoot!.innerHTML = `<h2>Carrito</h2>${html}`;
    this.shadowRoot!.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: id });
      });
    });
  }
}
customElements.define('shopping-cart', Cart);

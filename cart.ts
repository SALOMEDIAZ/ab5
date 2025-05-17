import store from './flux/Store';
import dispatcher from './flux/Dispatcher';
import { removeProduct } from './flux/Action';
import { Product } from './Root/types';

class Cart extends HTMLElement {
    private cart: Product[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleStoreChange = this.handleStoreChange.bind(this);
    }

    connectedCallback() {
        store.subscribe(this.handleStoreChange);
        this.cart = store.getState().cart;
        this.render();
    }

    disconnectedCallback() {
        store.unsubscribe(this.handleStoreChange);
    }

    handleStoreChange() {
        this.cart = store.getState().cart;
        this.render();
    }

    handleRemoveProduct(id: number) {
        dispatcher.dispatch(removeProduct(id));
    }

    render() {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    background-color: #f1f1f1;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    max-width: 400px;
                    margin: 20px auto;
                }
                h2 {
                    text-align: center;
                    color: #333;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #ddd;
                }
                button {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 4px 8px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #a71d2a;
                }
            </style>
            <h2>Carrito de Compras</h2>
            <ul>
                ${this.cart.length === 0 ? '<li>El carrito está vacío</li>' : this.cart.map(product => `
                    <li>
                        <span>${product.title} - $${product.price.toFixed(2)}</span>
                        <button data-id="${product.id}">Eliminar</button>
                    </li>
                `).join('')}
            </ul>
        `;

        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt((button as HTMLButtonElement).dataset.id!);
                this.handleRemoveProduct(id);
            });
        });
    }
}

export default Cart;

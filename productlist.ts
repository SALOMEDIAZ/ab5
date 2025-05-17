import { Product } from './Root/types'; 
import store from './flux/Store'; 
import dispatcher from './flux/Dispatcher';
import { buyProduct, removeProduct } from './flux/Action'; 
import { fetchProducts } from '../services/getdata'; 

class ProductList extends HTMLElement {
    private products: Product[] = []; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleStoreChange = this.handleStoreChange.bind(this);
    }

    async connectedCallback() {
        console.log('ProductList connected');
        store.subscribe(this.handleStoreChange); 
        this.products = await fetchProducts(); 
        this.render(); 
    }

    disconnectedCallback() {
        store.unsubscribe(this.handleStoreChange); 
    }

    handleStoreChange() {
        this.products = store.getState().products;
        this.render(); }

    handleBuyProduct(product: Product) {
        dispatcher.dispatch(buyProduct(product)); 
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
                    background-color: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #333;
                }
                .product-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }
                .product-card:hover {
                    transform: scale(1.05);
                }
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 4px;
                }
                .product-info {
                    text-align: center;
                }
                button {
                    margin-top: 10px;
                    padding: 8px 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .product-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            </style>
            <div>
                <h2>Lista de Productos</h2>
                <div class="product-list">
                    ${this.products
                        .map(
                            (product) => `
                                <div class="product-card">
                                    <img src="${product.image}" alt="${product.title}" />
                                    <div class="product-info">
                                        <strong>${product.title}</strong>
                                        <p>$${product.price.toFixed(2)}</p>
                                        <p>${product.description}</p>
                                        <button data-id="${product.id}" class="buy-product">Comprar</button>
                                    </div>
                                </div>
                            `
                        )
                        .join('')}
                </div>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.buy-product').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = parseInt((btn as HTMLButtonElement).dataset.id!);
                const product = this.products.find(p => p.id === id);
                if (product) {
                    this.handleBuyProduct(product); // Comprar y agregar producto al carrito
                }
            });
        });
    }
}
export default ProductList; // Exportar el componente

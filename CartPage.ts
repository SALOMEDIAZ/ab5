class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    connectedCallback() {
        this.render();
    }

    handleBackClick() {
        const event = new CustomEvent('navigate', {
            detail: { page: 'product-list' },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
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
                button {
                    margin-bottom: 20px;
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
            </style>
            <button id="back-button">Volver a Productos</button>
            <cart></cart>
        `;

        this.shadowRoot.getElementById('back-button')?.addEventListener('click', this.handleBackClick);
    }
}

export default CartPage;

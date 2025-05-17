class RootComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          font-size: 2rem;
          color: rgb(9, 142, 237);
          text-align: center;
          margin-top: 1rem;
        }
      </style>
      <h1>Bienvenido a nuestro Supermercado</h1>
      <product-list></product-list>
      <cart></cart>
    `;
  }
}

export default RootComponent; 

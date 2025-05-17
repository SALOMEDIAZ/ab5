export * from './services/getdata'; 
import RootComponent from './components/Root/Root'; 
customElements.define('root-component', RootComponent); 
import ProductList from './components/productlist';
customElements.define('product-list', ProductList); 

import Cart from './components/cart';
customElements.define('cart', Cart);

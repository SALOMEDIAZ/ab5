import { Product } from '../components/Root/types';

const CACHE_KEY = 'products_cache';
const CACHE_TIME = 60 * 1000; 

export const fetchProducts = async (): Promise<Product[]> => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const now = new Date().getTime();


    if (cachedData) {
        const { timestamp, products } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_TIME) {
            return products; 
        }
    }


    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, products }));
    return products;
};








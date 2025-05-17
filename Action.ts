export const BUY_PRODUCT = 'BUY_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const buyProduct = (product: any) => ({
    type: BUY_PRODUCT,
    payload: product, 
});

export const removeProduct = (productId: number) => ({
    type: REMOVE_PRODUCT,
    payload: productId, 
});

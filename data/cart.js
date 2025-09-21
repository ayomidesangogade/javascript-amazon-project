export const cart = [];

export function addToCart(productId) {
    let quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

    quantity = Number(quantity);

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity = quantity;
    } else {
        cart.push(
            {
                productId,
                quantity
            }
        );
    }
}
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}
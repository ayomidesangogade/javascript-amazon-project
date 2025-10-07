import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { deliveryOptions } from "./deliveryOptions.js";

const cart = {
    cartItems: undefined,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [];
    },

    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
        // let quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

        // quantity = Number(quantity);
        // for testing
        let quantity = 1;

        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity = quantity;
        } else {
            this.cartItems.push(
                {
                    productId,
                    quantity,
                    deliveryOptionId: "1"
                }
            );
        }

        this.saveToStorage();
    },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        renderCheckoutHeader();
        renderPaymentSummary();
        this.saveToStorage();
    },

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        });

        renderCheckoutHeader();
        renderPaymentSummary();
        this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        const deliveryOptionIdExists = deliveryOptions.find((option) => option.id === deliveryOptionId);

        if (matchingItem && deliveryOptionIdExists) {
            matchingItem.deliveryOptionId = deliveryOptionId;
        } else {
            return;
        }

        this.saveToStorage();
    }
};

cart.loadFromStorage();


const businessCart = {
    cartItems: undefined,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-business')) || [];
    },

    saveToStorage() {
        localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
        // let quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

        // quantity = Number(quantity);
        // for testing
        let quantity = 1;

        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity = quantity;
        } else {
            this.cartItems.push(
                {
                    productId,
                    quantity,
                    deliveryOptionId: "1"
                }
            );
        }

        this.saveToStorage();
    },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        renderCheckoutHeader();
        renderPaymentSummary();
        this.saveToStorage();
    },

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        });

        renderCheckoutHeader();
        renderPaymentSummary();
        this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        const deliveryOptionIdExists = deliveryOptions.find((option) => option.id === deliveryOptionId);

        if (matchingItem && deliveryOptionIdExists) {
            matchingItem.deliveryOptionId = deliveryOptionId;
        } else {
            return;
        }

        this.saveToStorage();
    }
};

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
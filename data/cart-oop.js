import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { deliveryOptions } from "./deliveryOptions.js";

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },

        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
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

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);
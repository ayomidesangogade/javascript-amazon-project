import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));
export function renderOrderSummary() {
    let checkOutHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const quantity = cartItem.quantity;

        const matchingProduct = products.find((product) => product.id === productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        checkOutHTML +=
            `<div class="cart-item-container
            js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${calculateDeliveryDate(deliveryOption)}</div>
                <div class="cart-item-details-grid">
                <img
                    class="product-image"
                    src=${matchingProduct.image}
                />

                <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">$${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${quantity}</span> </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingProduct.id}>
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" />
                    <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                        Delete
                    </span>
                    <div class="validation-message js-validation-message-${matchingProduct.id}"></div>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `<div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id} js-delivery-option-${deliveryOption.id}" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
                <input
                    type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id} js-delivery-option-input-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}"
                />
                <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} Shipping</div>
                </div>
            </div>`
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = checkOutHTML;

    document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            removeFromCart(productId);

            // const container = document.querySelector(`.js-cart-item-container-${productId}`);

            // container.remove();
            renderOrderSummary();
        });
    })

    document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-quantity');
            document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-editing-quantity');
            link.style.display = 'none';
            document.querySelector(`.js-quantity-label-${productId}`).style.display = 'none';

            document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click', () => {
                const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

                if (Number.isNaN(quantity) || typeof quantity === 'string') {
                    document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Invalid input';
                    document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                } else if (quantity >= 0 && quantity < 1000) {
                    updateQuantity(productId, quantity);
                    document.querySelector(`.js-validation-message-${productId}`).innerHTML = '';
                } else if (quantity < 0) {
                    document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Quantity can never be less than zero';
                    document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                } else if (quantity >= 1000) {
                    document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Quantity can never be equal or greater than 1000';
                    document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                }

                removeChanges(link, productId, quantity);
            });

            document.querySelector(`.js-quantity-input-${productId}`).addEventListener('keydown', (event) => {

                if (event.key === 'Enter') {
                    const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

                    if (Number.isNaN(quantity) || typeof quantity === 'string') {
                        document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Invalid input';
                        document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                    } else if (quantity >= 0 && quantity < 1000) {
                        updateQuantity(productId, quantity);
                        document.querySelector(`.js-validation-message-${productId}`).innerHTML = '';
                    } else if (quantity < 0) {
                        document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Quantity can never be less than zero';
                        document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                    } else if (quantity >= 1000) {
                        document.querySelector(`.js-validation-message-${productId}`).innerHTML = 'Quantity can never be equal or greater than 1000';
                        document.querySelector(`.js-validation-message-${productId}`).style.color = 'red';
                    }

                    removeChanges(link, productId, quantity);
                }
            });
        })
    });

    function removeChanges(link, productId, quantity) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity;
        document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-editing-quantity');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-editing-quantity');
        link.style.display = 'initial';
        document.querySelector(`.js-quantity-label-${productId}`).style.display = 'initial';
    }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    })
}
// MVC - Modal - Views - Controller
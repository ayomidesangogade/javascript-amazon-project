import { addToCart, calculateCartQuantity } from "../data/cart.js";
// import { cart as myCart } from "../data/cart.js";
// import * as cartModule from '../data/cart.js';
// cartModule.cart;
// cartModule.addToCart('id');
import { products } from "../data/products.js";

let productsHTML = '';

document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

products.forEach((product) => {
  productsHTML +=
    `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src=${product.getStarsUrl()}
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Polymorphism = use a method without knowing the class
// document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//     button.addEventListener('click', () => {
//         const productId = button.dataset.productId;

//         let matchingItem;

//         cart.forEach((item) => {
//             if (productId === item.productId) {
//                 matchingItem = item;
//             }
//         });

//         if (matchingItem) {
//             matchingItem.quantity += 1;
//         } else {
//             cart.push({
//                 productId: productId,
//                 quantity: 1
//             });
//         }

//         let cartQuantity = 0;

//         cart.forEach((item) => {
//             cartQuantity += item.quantity;
//         });

//         document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
//     })
// })
function updateCartQuantity(productId) {
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

  document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 1;

  let timeOut = false;
  let timeOutId;

  if (!timeOut) {
    timeOutId = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = 0;
    }, 2000);
    timeOut = true;
  } else {
    clearTimeout(timeOutId);
    timeOut = false;
  }
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity(productId);
  });
});
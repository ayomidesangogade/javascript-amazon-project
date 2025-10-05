import { addToCart, cart, loadFromStorage, removeFromCart } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: "1"
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1' }]));
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1' }]));
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `<div class="js-payment-summary"></div>
        <div class='js-checkout-header'></div>`;
    });
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })
    it('remove a productId that is in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: "1"
            }]);
        });
        loadFromStorage();

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('remove a productId that is in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: "1"
            }]);
        });
        loadFromStorage();

        removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1' }]));
    });
});
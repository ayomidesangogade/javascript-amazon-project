import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 4,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDay = deliveryOption.deliveryDays;
    let deliveryDate = today.add(deliveryDay, 'days');

    while (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday') {
        deliveryDate = today.add(deliveryDay, 'days');
        deliveryDay++;
    }
    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}
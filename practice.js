const object = {
    name: "Shirt",
    price: 2013,
    walk: false,
    'delivery-time': '12days',
    method() {
        console.log('I love JavaScript!');
    }
}

delete object.price;
object.method();
console.log(object);
object.price = 2002;
console.log(object);
console.log(object['delivery-time']);

const { walk } = object;
const { price } = object;
console.log(object);

const object2 = {
    walk,
    price
}
console.log(object2);

const objectString = JSON.stringify(object2);
console.log(JSON.parse(objectString));

const myArray = [1, 2, 3, 4, 4];
myArray[5] = 5;
console.log(myArray);
console.log(Array.isArray(myArray));
myArray.splice(0, 2);
console.log(myArray);

const myArray2 = myArray.slice();
console.log(myArray2);
myArray.forEach(element => console.log(element));
console.log(myArray.map(element => element));
console.log(myArray.filter(element => {
    if (element > 3)
        return element;
}));
myArray.forEach(element => {
    if (element > 3)
        return;
    console.log(element);
})

let count = 0;
let interval;
const stopInterval = () => {
    if (count === 10)
        clearInterval(interval);
};
interval = setInterval(() => {
    console.log('I love JavaScript!');
    count++;

    stopInterval();
}, 1000);

setTimeout(() => {
    console.log('I love Java!');
}, 2000);
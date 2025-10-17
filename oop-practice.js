class Car {
    brand;
    model;
    year;

    constructor(carObject) {
        this.brand = carObject.brand;
        this.model = carObject.model;
        this.year = carObject.year;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model} (${this.year})`);
    }
}

const car = new Car({ model: 'Corolla', brand: 'Toyota', year: 2020 });
car.displayInfo();

class BankAccount {
    #balance = JSON.parse(localStorage.getItem('bank-oop')) || 0;

    deposit(amount) {
        if (amount < 0) {
            document.querySelector('.js-display-info').innerHTML = 'Invalid Amount';
            return;
        }
        this.#balance += amount;
        localStorage.setItem('bank-oop', JSON.stringify(this.#balance));
        document.querySelector('.js-display-info').innerHTML = `Current Balance: ${this.#balance}, Amount Deposited: ${amount}`
    }

    withdraw(amount) {
        if (amount < 0 || amount > this.#balance) {
            document.querySelector('.js-display-info').innerHTML = 'Invalid amount or amount is greater than current balance.';
            return;
        }
        this.#balance = this.#balance - amount;
        localStorage.setItem('bank-oop', JSON.stringify(this.#balance));
        document.querySelector('.js-display-info').innerHTML = `Current Balance: ${this.#balance}, Amount Withdrawn: ${amount}`
    }

    getBalance() {
        document.querySelector('.js-display-info').innerHTML = `Current Balance: ${this.#balance}`;
    }
}

const bankAccount = new BankAccount();
document.querySelector('.js-deposit-amount').addEventListener('click', () => {
    let amount = Number(document.querySelector('.js-amount-input').value);
    bankAccount.deposit(amount);
});

document.querySelector('.js-withdraw-amount').addEventListener('click', () => {
    let amount = Number(document.querySelector('.js-amount-input').value);
    bankAccount.withdraw(amount);
});

document.querySelector('.js-get-balance').addEventListener('click', () => {
    bankAccount.getBalance();
});

class Person {
    name;
    age;

    constructor(person) {
        this.name = person.name;
        this.age = person.age;
    }

    introduce() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

class Student extends Person {
    level;

    constructor(person) {
        super(person);
        this.level = person.level;
    }

    introduce() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Level: ${this.level}`);
    }
}

const student = new Student({ name: 'Ayomide', age: 12, level: '200' });
student.introduce();
const person = new Person({ name: 'Ayomide', age: 12 });
person.introduce();

class Shape {
    area = 0;

    getArea() {
        return this.area;
    }
}

class Rectangle extends Shape {
    length;
    breadth;

    constructor(rectangle) {
        super();
        this.length = rectangle.length;
        this.breadth = rectangle.breadth;
    }

    getArea() {
        this.area = this.length * this.breadth;
        console.log(`Area of Rectangle: ${this.area}`);
    }
}

class Circle extends Shape {
    radius;

    constructor(radius) {
        super();
        this.radius = radius;
    }

    getArea() {
        this.area = Math.PI * Math.pow(this.radius, 2);
        console.log(`Area of a Circle: ${this.area}`);
    }
}

const shape = new Shape();
console.log(shape.getArea())
const rectangle = new Rectangle({ length: 12, breadth: 23 });
rectangle.getArea();
const circle = new Circle(12);
circle.getArea();

class Animal {
    sound;
    animal;

    constructor() {
        this.animal = '';
        this.sound = '';
    }
    speak() {
        console.log(`${this.animal} ${this.sound}`);
    }
}

class Dog extends Animal {
    constructor() {
        super();
        this.animal = 'Dog';
        this.sound = 'barks';
    }
    speak() {
        console.log(`${this.animal} ${this.sound}`);
    }
}

const dog = new Dog();
dog.speak();
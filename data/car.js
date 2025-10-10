class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carObject) {
        this.#brand = carObject.brand;
        this.#model = carObject.model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
        console.log((this.isTrunkOpen) ? 'Trunk is opened' : 'Trunk is closed');
    }

    go() {
        if (!this.isTrunkOpen) {
            this.speed += 5;
            this.speed = Math.min(Math.max(0, this.speed), 200);
        }
    }

    brake() {
        this.speed -= 5;
        this.speed = Math.min(Math.max(0, this.speed), 200);
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        if (this.speed > 0) {
            this.isTrunkOpen = false;
        } else if (this.speed === 0 && this.isTrunkOpen) {
            this.isTrunkOpen = false;
        }
    }
}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const car2 = new Car({ brand: 'Tesla', model: 'Model 3' });

// let go = setInterval(() => {
//     car1.go();
//     car1.openTrunk();
//     car1.displayInfo();
// }, 1000);

// let brake;

// setTimeout(() => {
//     clearInterval(go);
//     brake = setInterval(() => {
//         car1.brake();
//         car1.displayInfo();
//     }, 1000);
// }, 5000);

// setTimeout(() => {
//     clearInterval(brake);
//     car1.openTrunk();
//     car1.displayInfo();
// }, 10000);

class RaceCar extends Car {
    #brand;
    #model;
    acceleration;

    constructor(carObject) {
        super(carObject);
        this.#brand = carObject.brand;
        this.#model = carObject.model;
        this.acceleration = carObject.acceleration;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
    }

    go() {
        this.speed += this.acceleration;
        this.speed = Math.min(Math.max(0, this.speed), 300);
    }

    brake() {
        this.speed -= this.acceleration;
        this.speed = Math.min(Math.max(0, this.speed), 300);
    }
}

const raceCar = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 });
for (let i = 0; i < 12; i++) {
    raceCar.brake();
}

raceCar.displayInfo();
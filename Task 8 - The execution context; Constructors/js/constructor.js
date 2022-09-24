//Human Block
function Human(name, age) {
    this.name = name;
    this.age = age;
}

Human.prototype.logHumanData = function() {
    console.log(`Hey! I'm ${this.name} and I\'m ${this.age} years old`);
}

const getHumanData = () => {
    const name = prompt('Please enter Human\'s name', '');
    const age = +prompt('Please enter Human\'s age', '');

    return {name, age};
}

const human1Data = getHumanData();
const {human1Name, human1Age} = {human1Name: human1Data.name, human1Age: human1Data.age};
const human1 = new Human(human1Name, human1Age);

human1.logHumanData();

// const human2Data = getHumanData();
// const {human2Name, human2Age} = {human2Name: human2Data.name, human2Age: human2Data.age};
// const human2 = new Human(human2Name, human2Age);

// human2.logHumanData();

//Car Block
function Car(brand, model, colour) {
    this.brand = brand;
    this.model = model;
    this.colour = colour;
    this.owner;
}

Car.prototype.logCarData = function() {
    console.log(`The car brand is: ${this.brand}, the model is: ${this.model} and the colour is: ${this.colour} ${this.owner ? 'The car owner is ' + this.owner.name : ''}`);
}

Car.prototype.addCarOwner = function(owner) {
    this.owner = owner;
}

const getCarData = function() {
    const brand = prompt('Please enter the car brand', '');
    const model = prompt('Please enter the car model', '');
    const colour = prompt('Please enter the car colour');

    return {brand, model, colour};
}

const car1Data = getCarData();
const {car1Brand, car1Model, car1Colour} = {car1Brand: car1Data.brand, car1Model: car1Data.model, car1Colour: car1Data.colour};
const car1 = new Car(car1Brand, car1Model, car1Colour);

car1.addCarOwner(human1);
car1.logCarData(car1Brand, car1Model, car1Colour);
console.log("ES6 Destructing");

const person = {
    name: 'ramindur',
    age: 58,
    location: {
        city: 'Hounslow',
        temp: 24
    }
};

const {name: firstname = 'Anonymous', age, surname = "Not given"} = person;
const {city, temp: tempreture} = person.location;

console.log(`${firstname} (${surname}) is ${age}.`);
if(city && tempreture){
    console.log(`It is ${tempreture} at ${city}`);
}

const address = ['9 The Alders', 'Heston', 'Middlesex','TW5 0HP'];
const [, town, county = 'Middlesex' ] = address;

console.log(`You are in ${town} ${county}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`${itemName} costs ${mediumPrice}`);
//OBJECT DESTRUCTURING
// const person = {
//     name: 'bruno',
//     age: 21,
//     location: {
//         city: 'Uberlandia',
//         state: 'Minas Gerais'
//     }
// };

// const {name = 'matheus', age: idade} = person;

// console.log(`${name} is ${idade}.`);

//ARRAY DESTRUCTURING

const address = ['1843', 'Uberlandia', 'Minas Gerais', 'Brazil'];

const [, city, state = 'Sao Paulo'] = address;

console.log(`You are in ${city} - ${state}`);
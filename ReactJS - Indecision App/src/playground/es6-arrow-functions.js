const square = function (x) {
    return x * x;
};

// const squareArrow = (x) => {
//     return x*2;
// };

const squareArrow = (x) => x * x;

const getFirstName = (name) => name.split(' ')[0];




const multiplier = {
    numbers: [1,2,3],
    multiplyBy(numberToMultiply) {
        return this.numbers.map((number) => number * numberToMultiply);
    }
};

console.log(multiplier.multiplyBy(5));
const getArithmeticMean = function(arr) {
    let sum = 0;
    let arrLength = arr.length;
    for(let el of arr) {
        if (isNaN(el) || el == 0) { // '' == 0, isNaN(Number('sdf') -> NaN) === true
            arrLength -= 1;
        } else {
            sum += +el;
        }
    }

    // console.log(arr); // Not mutated
    return sum / arrLength;
}

console.log(getArithmeticMean([,,'6','sdf',1,2,3,4,5,,'7',''])); // 28 / 7 = 4
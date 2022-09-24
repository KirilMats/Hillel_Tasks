const getMultipliedNums = function(a) {
  return function(b) {
        return a * b;
    }
}
console.log(getMultipliedNums(122)(2));

// function pow(x, n) {
//     if(x == 1) {
//         return x;
//     } else {
//         return x * pow(x, n - 1);
//     }
// }

// pow(2, 4);
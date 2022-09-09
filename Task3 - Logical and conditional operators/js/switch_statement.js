const checkNumber = () => {
    let num = Number(prompt('Please enter a number in the range from 0 to 3', 0));

    switch (num){
        case 0:
            console.log('You\'ve entered number 0');
            break;
        case 1:
            console.log('You\'ve entered number 1');
            break;
        case 2:
        case 3:
            console.log('You\'ve entered number 2 or 3');
            break;
        default:
            console.log('The number you\'ve entered is not in the range from 0 to 3 or is not a number');
    }
}
checkNumber();


// const checkEqualitySw = () => {
//     let num = prompt('Please enter three-digit number', 0);
//     const notAThreeDigit = num.length > 3 || num.length < 3;
//     const anyEqual = num[0] === num[1] || num[1] === num[2] || num[0] === num[2];
//     const allEqual = num[0] === num[1] && num[1] === num[2];
    
//     switch (true) {
//         case (notAThreeDigit):
//             alert('The number you enter must be three-digit. Please try again');
//             break;

//         case (allEqual):
//             alert('All numbers are equal');
//             break;

//         case (anyEqual):
//             alert("Some of the numbers are equal");
//             break;

//         default:
//             alert('None of the numbers are equal');
//     }
// }

// checkEqualitySw();
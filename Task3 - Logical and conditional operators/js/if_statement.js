const checkEquality = () => {
    let num = prompt('Please enter three-digit number', 0);

    if(num.length > 3 || num.length < 3) {
        alert('The number you enter must be three-digit. Please try again');
    } else {
        if(num[0] === num[1] || num[1] === num[2] || num[0] === num[2]) {
            if(num[0] === num[1] && num[1] === num[2]) {
                alert('All numbers are equal');
            } else {
                alert('Some of the numbers are equal');
            }
        } else {
            alert('None of the numbers are equal');
        }
    }
}

checkEquality();


// const checkEqualityOfEach = () => {
//     let num = prompt('Please enter three-digit number', 0);

//     if(num.length > 3 || num.length < 3) {
//         alert('The number you enter must be three-digit. Please try again');
//     } else {
//         // num[0] === num[1] && num[1] === num[2] ? alert("All numbers are equal") : alert("Not all of the numbers are equal");
//         if(num[0] === num[1] && num[1] === num[2]) {
//             alert('All numbers are equal');
//         } else {
//             alert('Not all numbers are equal');
//         }
//     }
// }

// checkEqualityOfEach();

// const checkEqualityOfAny = () => {
//     let num = prompt('Please enter three-digit number', 0);

//     if(num.length > 3 || num.length < 3) {
//         alert('The number you enter must be three-digit. Please try again');
//     } else {
//         // num[0] === num[1] || num[1] === num[2] || num[0] === num[2] ? alert("Some of the numbers are equal") : alert("None of the numbers are equal");
//         if(num[0] === num[1] || num[1] === num[2] || num[0] === num[2]) {
//             alert('Some of the numbers are equal');
//         } else {
//             alert('None of the numbers are equal');
//         }
//     }
// }

// checkEqualityOfAny();
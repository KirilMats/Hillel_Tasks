const checkEqualitySw = () => {
    let num = prompt('Please enter three-digit number', 0);
    const notAThreeDigit = num.length > 3 || num.length < 3;
    const anyEqual = num[0] === num[1] || num[1] === num[2] || num[0] === num[2];
    const allEqual = num[0] === num[1] && num[1] === num[2];
    
    switch (true) {
        case (notAThreeDigit):
            alert('The number you enter must be three-digit. Please try again');
            break;

        case (allEqual):
            alert('All numbers are equal');
            break;

        case (anyEqual):
            alert("Some of the numbers are equal");
            break;

        default:
            alert('None of the numbers are equal');
    }
}

checkEqualitySw();
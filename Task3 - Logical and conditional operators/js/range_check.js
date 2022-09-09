const checkRange = () => {
    let num = Number(prompt('Please enter any number', 0));
    
    if(num === NaN || !isFinite(num)){
        alert('The value you\'ve entered is not finite or is not a number');
    } else {
        if(num >= 0 && num <= 500) {
            alert(`The number ${num} is in the range from 0 to 500`);
        } else {
            alert(`The number ${num} is NOT in the range from 0 to 500`);
        }
    }
}

checkRange();
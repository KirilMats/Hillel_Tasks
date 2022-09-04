const arithmeticMean = () => {
    const numb1 = Number(prompt('Please enter the first number', 0).replace(/['"]+/g, ''));
    const numb2 = Number(prompt('Please enter the second number', 0).replace(/['"]+/g, ''));
    const numb3 = Number(prompt('Please enter the second number', 0).replace(/['"]+/g, ''));
    const res = (numb1 + numb2 + numb3) / 3;
    typeof res === 'number' && isFinite(res) ? alert(`Result: ${res}`) : alert('The value you\'ve entered is not a number or is Infinity');
}

arithmeticMean();
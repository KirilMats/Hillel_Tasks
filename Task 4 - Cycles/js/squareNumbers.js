const squareNumbers = () => {
    const n = +prompt('Please enter any integer number', 0);

    for(let i = 1; i <=100; i++) {
        let pow = i**2;
        if(pow <= n) {
            console.log(`${pow} is less than ${n}`);
        }
    }
}

squareNumbers();
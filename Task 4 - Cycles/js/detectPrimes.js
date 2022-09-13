const isPrime = () => {
    const p = +prompt('Please enter any integer number', 0);
    let res = p > 1;

    for(let i = 2; i < p; i++) {
        if(p % i === 0) {
            res = false;
            break;
        }
    }
    
    console.log(res === true ? `It's a prime number` : `It's NOT a prime number`);
}

isPrime();
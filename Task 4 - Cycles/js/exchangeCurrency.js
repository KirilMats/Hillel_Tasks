const exchangeCurrency = () => {
    const dollar = 26;
    let i = 0;
    while (i < 100) {
        i+=10;
        console.log(`${i} dollars eqaul to ${i*dollar} hryvnas`);
    }
} 
exchangeCurrency();
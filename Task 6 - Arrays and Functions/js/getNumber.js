const getNumber = () => {
    // let i = 0;
    // while(i < 10) {
    //     i++;
    //     let value = +prompt('Please enter a number greater than 100', 0);
    //     if(value > 100) {
    //         alert(`You've entered a number: ${value}`);
    //         break;
    //     }
    // }

    for(let i = 0; i < 10; i++) {
        let value = +prompt('Please enter a number greater than 100', 0);
        if(value > 100) {
            alert(`You've entered a number: ${value}`);
            break;
        }
    }
}

getNumber();
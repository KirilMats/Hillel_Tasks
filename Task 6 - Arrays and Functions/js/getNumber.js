const getNumber = () => {
    // let i = 0;
    // while(i < 10) {
    //     i++;
    //     let value = +prompt('Please enter a number greater than 100', 0);
    //     if(value > 100) {
    //         alert(`You've entered a number: ${value}`);
    //         break;
    //     } else {
    //     if(i === 10) {
    //         alert('You have reached the limit of attempts :)');
    //         break;
    //     }
    //     alert('The number must be greater than 100. Please try again :)');
    // }
    // }

    for(let i = 0; i < 10; i++) {
        let value = +prompt('Please enter a number greater than 100', 0);
        if(value > 100) {
            alert(`You've entered a number: ${value}`);
            break;
        } else {
            if(i === 9) {
                alert('You have reached the limit of attempts :)');
                break;
            }
            alert('The number must be greater than 100. Please try again :)');
        }
    }
}

getNumber();
const getNumber = () => {
    // let i = 0;
    // while(i < 10) {
    //     i++;
    //     let value = prompt('Please enter a number greater than 100', 0);
    //     if(isNaN(+value) || +value > 100) {
    //         console.log(`You've entered this: ${value}`);
    //         break;
    //     } else {
    //     if(i === 10) {
    //         console.log(`You have reached the limit of attempts. The last value you've entered is: ${value}`);
    //         break;
    //     }
    //     alert(`You've entered this: ${value}. The number must be greater than 100. Please try again. (Attempts remaining: ${10 - i}))`);
    //     }
    // }

    for(let i = 0; i < 10; i++) {
        let value = prompt('Please enter a number greater than 100', 0);

        if(isNaN(+value) || +value > 100) {
            console.log(`You've entered this: ${value}`);
            break;
        } else {
            if(i === 9) {
                console.log(`You have reached the limit of attempts. The last value you've entered is: ${value}`);
                break;
            }
            alert(`You've entered this: ${value}. The number must be greater than 100. Please try again. (Attempts remaining: ${9 - i}))`);
        }
    }
}

getNumber();
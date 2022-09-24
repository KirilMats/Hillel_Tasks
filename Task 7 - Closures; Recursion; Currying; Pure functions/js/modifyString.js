const getModifiedString = function(str, args) {
    const modifiedString = str.toLowerCase();
    const exclusions = args;
    let arr = Array.from(modifiedString);

    arr = arr.filter(el => exclusions.includes(el) ? false : true);
        
    console.log(arr.join(''));
    // console.log(str); // not mutated
    // console.log(args); // not mutated
}

getModifiedString('Slava Ukraini!', ['i', 1, 'v', , 'a', '!', ' ']);
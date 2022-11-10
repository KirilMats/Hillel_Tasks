"use strict";
document.addEventListener('DOMContentLoaded', function(){
    class User {
        constructor(id = 'Error', fName, lName, age, ...args) {
             this.userData = [id, fName, lName, age, ...args];
        }
        checkCount() {
           this.userData.length < 5 ? console.error('Less than 5 arguments') : '';
        }
        getFirstThree() {
            console.log(this.userData.slice(0, 3).join('-'));
        }
        getAllAfterThird() {
            const allAfterThird = new Map();
            this.userData.slice(3).forEach((el, i)=>{
                typeof el === "undefined" ? el = 'Error' : '';
                allAfterThird.set(i, el);
            });
            console.log(allAfterThird);
        }
    }
    const userData = [undefined, 'Nick','Fix', 23, 'Married', 'Employed', '+123432456', 180];
    const user = new User(...userData);
    user.checkCount();
    user.getFirstThree();
    user.getAllAfterThird();
})
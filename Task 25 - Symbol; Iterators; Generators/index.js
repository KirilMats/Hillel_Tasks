'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let object = {
        name: 'Stanley',
        Job: 'Web dev',
        age: 28,
    }
    let object2 = {
        a: 10,
        b: 20,
        c: 30,
        d: 40,
    }
    function iterateByProp(obj) {
        obj[Symbol.iterator] = function* () {
            for (let prop in this) {
                yield this[prop];
            }
        }
    }
    iterateByProp(object);

    function getObjectValues(obj) {
        for (let val of obj) {
            console.log(val);
        }
    }
    getObjectValues(object);

    function iterateByValue(obj) {
        obj[Symbol.iterator] = function () {
            return {
                current: this.a,
                last: this.d,
                next: function () {
                    if (!this.a && this.current < this.last) {
                        return {
                            value: this.current += 10,
                            done: false
                        }
                    } else {
                        return {
                            value: undefined,
                            done: true
                        }
                    }
                }
            }
        }
    }
    iterateByValue(object2);
    getObjectValues(object2);
})
const updateObject = () => {
    let menu = {
        width: 200,
        height: 300,
        title: "My menu"
      };
    
    for(let prop in menu) {
      if(typeof menu[prop] === 'number') {
        menu[prop]*=2
      }
      // typeof menu[prop] === 'number' ? menu[prop]*=2 : 0;
    }
    
    console.log(menu);
    delete menu.width;
    delete menu.height;
    menu.title = 'Clear';
    console.log(menu);
}

updateObject();

// const obj1 = {
//     name: 'kev',
//     age: 30,
//     getAge: function() {
//         console.log('I am ' + this.age + ' years')
//     },
//     skills: {
//         speak: function() {
//             console.log('Say something');
//         },
//         programming: 'JS',
//         english: 'C1'
//     }
// }

// const obj2 = Object.assign({}, obj1);
// const obj3 = {...obj1};
// const obj4 = JSON.parse(JSON.stringify(obj1));
// obj1.name = 'Leo';
// obj1.getAge = function() {
//     console.log('I will not tell my age')
// }
// obj1.skills.speak = function() {
//     console.log('I won\'t tell anything to you')
// }
// obj1.skills.programming = 'C++'; 

// console.log(obj1);
// obj1.getAge();
// obj1.skills.speak();
// console.group();
// console.log(obj2);
// obj2.getAge();
// obj2.skills.speak();
// console.group();
// console.log(obj3);
// obj3.getAge();
// obj3.skills.speak();
// console.group();
// console.log(obj4);
// obj4.getAge();
// obj4.skills.speak();
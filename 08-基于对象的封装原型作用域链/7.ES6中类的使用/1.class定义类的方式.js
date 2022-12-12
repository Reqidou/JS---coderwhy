class Person {}//声明类
var Student = class {} //表达式

console.log(Person.prototype); //{}
console.log(Person.prototype.__proto__);//[Object: null prototype] {}
console.log(Person.prototype.constructor);//[class Person]
console.log(typeof Person); //function


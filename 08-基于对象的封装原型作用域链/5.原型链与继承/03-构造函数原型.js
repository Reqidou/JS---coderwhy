function Person() {

}

console.log(Object.getOwnPropertyDescriptors(Person.prototype.constructor));
console.log(Person.prototype);//构造函数的显示原型
console.log(Person.prototype.__proto__);//指向Object
console.log(Person.prototype.__proto__.__proto__);//null
console.log(Person.prototype.__proto__.constructor.constructor);//Function  
//每个对象都有一个[prototype], 称之为对象的隐式原型
var obj = { name: 'qidou'} // [[prototype]]
var info = {}

//浏览器提供的原型对象
console.log(obj.__proto__);

//ES5之后提供的
console.log(Object.getPrototypeOf(obj));
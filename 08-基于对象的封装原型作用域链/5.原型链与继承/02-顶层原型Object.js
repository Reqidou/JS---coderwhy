var obj = {}

console.log(obj.__proto__); //[Object: null prototype] {}

console.log(obj.__proto__.__proto__); //null

//顶层原型来自哪里？
function Person() {

}
var p = new Person()
 console.log(p.__proto__.__proto__, obj.__proto__, Person.prototype.__proto__ === Object.prototype);

var obj1 = {
  name: 'qidou'
}
obj.__proto__ = obj1 //重新将obj的隐式函数指向新建的对象，所以原型链为：obj => obj1 => Object => null

console.log(obj.name);
console.log(obj.__proto__.__proto__ === obj1.__proto__ , obj1.__proto__ === Object.prototype, Object.__proto__ === null ); //true
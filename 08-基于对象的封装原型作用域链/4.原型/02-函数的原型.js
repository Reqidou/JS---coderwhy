function foo() {

}
//函数也是一个对象
console.log(foo.__proto__); //函数作为对象，也有隐式原型[[prototype]]

//函数的显示原型 prototype
console.log(foo.prototype);

var f1 = new foo()
var f2 = new foo()

console.log(f1.__proto__ === f2.__proto__, f1.__proto__ === foo.prototype);
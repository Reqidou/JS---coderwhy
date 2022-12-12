function Foo() {

}

console.log(Object.getOwnPropertyDescriptors(Foo.prototype));
// constructor: {
  // value: [Function: Foo],
  // writable: true,
  // enumerable: false,
  // configurable: true
// }
Object.defineProperty(Foo, 'constructor', {
  writable: true,
  enumerable: true,
  configurable: true,
})
console.log(Foo.prototype.constructor); //[Function: Foo]

//2.可以添加自己的属性
Foo.prototype.name = 'qidou'
var f1 = new Foo()
console.log(f1.name);

//3.直接修改整个prototype对象
Foo.prototype = {
  //这样修改constructor会默认更改它的内部属性为true，推荐使用definepeoperty
  // constructor: Foo,
  name: 'qidouKing',
  age: 2000,
}

//Eg:
Object.defineProperty(Foo, 'constructor', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: Foo
})
var f2 = new Foo()
console.log(f2.name, f2.age);


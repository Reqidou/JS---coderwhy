function createObj(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}
function inheritProperty(subType, superType) {
  subType.prototype = createObj(superType.prototype)
  Object.defineProperty(subType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: subType
  })
} 
function Person() {}
function Student() {}

inheritProperty(Student, Person)

var stu = new Student()
//判断对象的原型链是否存在构造函数的prototype
console.log(stu instanceof Person);
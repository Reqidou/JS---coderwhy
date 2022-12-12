var obj = {
  name: 'qidou',
  age: 22
}

function createObject1(o) {
  var newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}

function createObject2(o) {
  function Fn(){}
  Fn.prototype = o //Fn的原型指向obj对象
  var newObj = new Fn()//new 对象创建：newObj的原型指向Fn函数的原型， newObj.__proto__ = Fn.prototype
  return newObj
}

var info = createObject2(obj)

Object.create(obj) //ES最新方法，也可以实现，功能跟上面写的一样

console.log(info.__proto__);

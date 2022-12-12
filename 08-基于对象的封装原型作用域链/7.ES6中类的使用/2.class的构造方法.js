class Person {
  // 类的构造方法 一个类只有一个构造方法
  // 1.在内存新创建一个对象 newObj = {}
  // 2.将类的显示原型赋值给新创建对象的隐式原型 newObj.__proto__ = Person.prototype
  // 3.将对象赋值给该类的this  this = newObj
  // 4.执行函数体内代码块
  // 5.默认返回改对象
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

var qidou = new Person('qidou', 23)
console.log(qidou);
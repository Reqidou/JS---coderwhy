function createObj(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritProperty(subType, superType) {
  // subType.prototype = Object.create(superType.prototype)
  subType.prototype = createObj(superType.prototype)
  Object.defineProperty(subType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: subType,
  })
}
function Person(name) {
  this.name = name
}
Person.prototype.coding = function() {
  console.log('coding');
}

function Student(name, age) {
  Person.call(this, name)
  this.age = age
}

//如果每次新建一个构造函数，都需要重新定义一次这些东西，比较繁琐，所以封装一个函数inheritProperty
// Student.prototype = Object.create(Person.prototype)//Student.prototype.__proto__ = Person.prototype
// Object.defineProperty(Student.prototype, 'constructor', {
//   configurable: true,
//   enumerable: false,
//   writable: true,
//   value: Student
// })
inheritProperty(Student, Person)

Student.prototype.ages = function() {
  console.log(`${this.name} is ${this.age} years`);
}

var stu = new Student('qidou', 22)
console.log(stu);//Person { name: 'qidou', age: 22 } 前面的Person类型在Student.prototype.constructor中找到name属性
console.log(Student.prototype.constructor.name); //Person 所以需要看15行的代码，修改指向
console.log(stu.constructor.name);//通过30行的代码，已经将类型改为Student
stu.ages() //qidou is 22 years
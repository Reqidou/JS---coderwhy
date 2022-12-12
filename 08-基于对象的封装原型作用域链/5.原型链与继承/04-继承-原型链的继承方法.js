// 父类：公共参数
function Person() {
  this.name = 'qidou',
  this.friends = []
}

Person.prototype.hobby = function() {
  console.log(`${this.name} love coding`);
}

// 子类：自身携带的参数
function Student() {
  this.age = 22
}

Student.prototype = new Person()

var stu = new Student()
console.log(stu.name);
stu.hobby()

//原型链继承的弊端
// 1.无法看到所有的参数属性
console.log(stu); //Person { age: 22 }

// 2.创建两个对象
var stu1 = new Student()
var stu2 = new Student()
// 这种获取参数属性调用的方法，会更改它的默认值
// stu1.friends.push('coding')
// console.log(stu1.friends, stu2.friends);//[ 'zhaolu' ] [ 'zhaolu' ]
// 如果使用赋值表达式， 则会给对象本身创建一个新的属性，避免这个问题
stu1.friends = ['coding', 'zzq', 'zf']
console.log(stu1.friends, stu2.friends); //[ 'coding', 'zzq', 'zf' ] []

// 3.在前面实现类无法传递参数

// 借用构造函数可以解决这三个问题！
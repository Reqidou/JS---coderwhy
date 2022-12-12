// 父类：公共参数
function Person(name, friends) {
  this.name = name,
  this.friends = [friends]
}

Person.prototype.hobby = function() {
  console.log(`${this.name} love coding`);
}

// 子类：自身携带的参数
function Student(name, age, friends) {
  //子类借用父类函数方法，实现构造函数的继承
  Person.call(this, name, friends)
  this.age = age
}

Student.prototype = new Person()

var stu = new Student('qidou', 22, ['1', '2'])
console.log(stu.name);
stu.hobby()

//构造函数解决了原型链继承的弊端
// 1.无法看到所有的参数属性

console.log(stu); //Person { name: 'qidou', friends: [ [ '1', '2' ] ], age: 22 }

// 2.创建两个对象
var stu1 = new Student('qidou', 23, 'coding')
var stu2 = new Student('qidou', 24, 'playing')
// 这种获取参数属性调用的方法，会更改它的默认值
stu1.friends.push('add1')
console.log(stu1.friends, stu2.friends);//[ 'coding', 'add1' ] [ 'playing' ]
// 如果使用赋值表达式， 则会给对象本身创建一个新的属性，避免这个问题
stu1.friends = ['coding', 'zzq', 'zf']
console.log(stu1.friends, stu2.friends); //[ 'coding', 'zzq', 'zf' ] [ 'playing' ]

// 3.在前面实现类无法传递参数


// 借用构造函数的弊端
// 1.Person函数会至少调用两次： 学生构造函数的指向创建Person； 子类调用父类方法
// 2.stu原型对象会多出新建的属性：也就是学生构造函数的指向创建Person问题，值为undefined
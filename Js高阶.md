## Js高阶

### 1. 柯里化

#### 柯里化逻辑的复用

```js
var log = date => type => msg => {
  console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${msg}]`); 
} 

let show = log(new Date())('show')
show('test')
```

#### 柯里化过程的实现

```js
function _currying(fn) {
    return curried(...args) {
        //判断参数长度
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        }
        else {
            return function(...args2) {
                return curried.apply(this, [...agrs, ...args2])
            }
        }
    }
}

function add1(x, y) {
  return x + y
}

var curryAdd = _currying(add1)
console.log(curryAdd(5)(10)); 
console.log(_currying(add1)(5)(5));
```

#### 组合函数

```js
function double(num) {
    return num * 2
}
function square(num) {
    return num ** 2
}

function composeFn(m, n) {
    return function(count) {
        return m(n(count))
    }
}

var newFn = composeFn(square, double)
console.log(newFn(10)) //400
```

#### 组合函数过程的实现

```js
function _compose(...fns) {
    var length = fns.length
    for(var i = 0; i < length; i++) {
        if(typeof fns[i] !== 'function') {
            throw new TypeError('all arguments must are function')
        }
    }
    return function (...args) {
        var index = 0
        var result = length ? fns[index].apply(this, args) : args
        while(++index < length) {
            result = fns[index],call(this, result)
        }
        return result
    }
}
```

### 2.方法补充

#### with

```js
var obj = {name: 'qidou', msg: '呐呐呐'}
function foo() {
  function bar() {
    msg = 100
    with(obj) { //with没办法在严格模式运行， 会报错
      console.log(this, msg);
    }
  }

  bar()
}

foo()
```

#### eval

```js
var jsString = `var msg = 'hi'; console.log(msg);`
eval(jsString)
//如果使用严格模式，则无法再外部获取定义的变量
console.log(msg) // msg is not defined
```

### 3.面向对象

#### defineProperty

```js
var obj = {
  name: 'qidou',
  hobby: function() {
    console.log('HiHi');
  }
}

//Object.defineProperty
//修改
Object.defineProperty(obj, 'name', {
  value: 'zahoxuan'
})
//添加 由于添加的属性为不可枚举，所以需要添加内部属性
Object.defineProperty(obj, 'hate', {
  enumerable: true,
  value: '疫情封城',
})
console.log(obj);
```

##### 数据属性描述符

```js
var obj = {
  //enumerable: true
  //configurable: true
  //writable: true
  name: 'qidou', //value
  hobby: function() {
    console.log('HiHi');
  }
}

Object.defineProperty(obj, 'hate', {
  //configurable:
    //1. 可以避免数据属性被删除
    //2. 也可以防止被再次定义
  configurable: false, //false
  //该属性是否枚举
  enumerable: true, //false
  //该属性是否允许重写
  writable: false, //false
  value: '疫情封城', //undefined
})

//configurable
// 1. 可以避免数据属性被删除
// delete obj.hate
// console.log(obj.hate); //疫情封城

//2. 也可以防止被再次定义
// Object.defineProperty(obj, 'hate', {
//     //2. 也可以防止被再次定义
//   configurable: false,
//   value: '疫情封城2',
// }) // err

//enumerable //可枚举
// console.log(obj);

// 3.writable 禁止重写  strict严格模式： 静默错误， 报错
// obj.hate = '123'
// console.log(obj.hate); //疫情封城
```

##### 存取属性描述符

```js
var obj = {
  //enumerable: true
  //configurable: true
  //writable: true
  name: 'qidou', //value
  _hate: '内部私有变量，隐藏'
}

function getDate() {
  console.log(`获取${this._hate}属性`);
}
function setDate() {
  console.log('设置了属性值');
}
//Vue2的原理 defineProperty
//1.隐藏某一私有属性，直接被外界使用，赋值
// 2.截获某一属性访问和设置的过程，使用属性描述符
Object.defineProperty(obj, 'hate', {
  configurable: true,
  enumerable: true,
  get: function() {
    getDate.call(this)
    return this._hate
  },
  set: function(value) {
    setDate()
    this._hate = value
  }
})
console.log(obj.hate);
obj.hate = '修改'
console.log(obj.hate);
```

##### 定义多个属性描述符

```js
const obj = {
  _age: 18,
  //如果属性的默认值皆为true，则可用这种写法
  // set age(value) {
  //   this._age = value
  // },
  // get age() {
  //   return this._age
  // }
}

Object.defineProperties(obj, {
  name: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: 'qidou',
  },
  //如果属性的默认为true， 可简写。第三行开始的方法
  age: {
    configurable: true,
    enumerable: true,
    get() {
      return this._age
    },
    set(value) {
      this._age = value
    }
  }
})
obj.age = 24
console.log(obj);
```

##### Object方法对对象的限制

```js
var obj = {
  age: 21,
}
//禁止对象继续添加新属性
Object.preventExtensions(obj)
obj.name = 'qidou'
console.log(obj);

//禁止对象配置/删除里面的属性[configurable]
Object.seal(obj) // 所有configurable为false
delete obj.age
console.log(obj.age);

//禁止对象修改[writable]
Object.freeze(obj)
obj.age = 22
console.log(obj.age);
```

### 4.创建对象

#### 4.1字面量创建对象

```js
// 1.new Object
 var obj = new Object()
 obj.name = 'qidou'
 obj.hobby = function() {
   console.log(`${this.name} love typing`);
 }

 obj.hobby()

// 2.字面量创建
var obj = {
  name: 'qidou',
  hobby: function() {
    console.log(`${this.name} love typing`);
  }
}

obj.hobby()

```

#### 4.2工厂模式

```js
function createObj(name, hobby) {
    var p = {}
	p.name = name
	p.hobby = function() {
        console.log(`${name}喜欢${hobby}`);
    }
    return p
}

var p1 = createObj('qidou', 'coding')

//工厂模式的优点：解决了字面量的代码重复问题
//工厂模式的缺点：获取不到对象的真实类型
console.log(p1);

```

#### 4.3构造函数

##### 4.3.1 构造函数的基本使用

```js
function foo() {
  console.log('foo~,函数代码执行体');
}
//使用new关键字的函数为构造函数
var f1 = new foo() //后面因为传值加括号， 不加也可以执行

// new对象的方法：
// 1.内部开辟出一块新的地址，用来存储对象 {}
// 2.这个对象内部的[[prototype]]属性会被赋值为构造函数的prototype属性  || 函数显示原型赋值给对象的隐式原型 
// 3.构造函数的内部this指向创建出来的新对象 this = {}
// 4.执行内部代码 
// 5.如果构造函数没有返回非空对象，则返回创建出来的新对象 return this
console.log(f1);
```

##### 4.3.2 构造函数创建对象

```js
// 构造函数首字母大写
function Foo(name, hobby) {
  this.name = name
  this.hobby = function() {
    console.log(`${this.name} love ${hobby}`);
  }
}

var zx = new Foo('qidou', 'coding')
//跟工厂函数相比，有了新的类型： Foo
//弊端： 每一次创建，都会创建一个新的函数内部方法hobby，浪费资源。所以使用原型 
console.log(zx);

console.log(zx.__proto__ === Foo.prototype); //true
console.log(zx.__proto__.constructor === Foo); //true
```

#### 4.4 原型跟构造函数相结合

```js
function Person(name, age) {//构造函数一般为大写 
  this.name = name
  this.age = age
}
//构造函数的显示原型
Person.prototype.eating = function() {
  console.log(this.name + '在吃');//this指向跟函数调用有关，位置无关
}

var p1 = new Person('qidou', 22)
console.log(p1);
p1.eating()
```

### 5.原型

#### 5.1对象的原型

```js
//每个对象都有一个[prototype], 称之为对象的隐式原型
var obj = { name: 'qidou'} // [[prototype]]
var info = {}

//浏览器提供的原型对象
console.log(obj.__proto__);

//ES5之后提供的
console.log(Object.getPrototypeOf(obj));
```

#### 5.2函数的原型

```js
function foo() {

}
//函数也是一个对象
console.log(foo.__proto__); //函数作为对象，也有隐式原型[[prototype]]

//函数的显示原型 prototype
console.log(foo.prototype);

var f1 = new foo()
var f2 = new foo()

console.log(f1.__proto__ === f2.__proto__, f1.__proto__ === foo.prototype);
```

#### 5.3 函数原型上的属性

```js
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
```

### 6.原型链与继承

#### 6.1原型链的理解

```js
var obj = {
  name: 'qidou'
}

// [[get]]
// 会在当前的对象查找属性，如果没有，则会在[[prototype]] 也就是__proto__查找隐式原型

obj.__proto__ = {
  age: 22
}
obj.__proto__.__proto__ = {
  forward: 'forward'
}
console.log(obj.age, obj.forward);
```

#### 6.2顶层原型Object

```js
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
```

#### 6.3构造函数的理解

```js
function Person() {

}

console.log(Object.getOwnPropertyDescriptors(Person.prototype.constructor));
console.log(Person.prototype);//构造函数的显示原型
console.log(Person.prototype.__proto__);//指向Object
console.log(Person.prototype.__proto__.__proto__);//null
console.log(Person.prototype.__proto__.constructor.constructor);//Function  
```

#### 6.4继承-原型链的继承方法

```js
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
```

#### 6.5继承-借用构造函数解决原型链存在的三个问题

```js
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
```

#### 6.6继承-原型式继承-对象

```js
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
```

#### 6.7继承-寄生式继承-对象

```js
//借用原型式继承跟工厂函数组合成寄生式继承
var personObj = {
  coding: function() {
    console.log('coding');
  }
}
//工厂函数
//弊端： 1.每次创建都会多一层定义的studying函数。 2.无法确定类型【因为不是使用new关键字创建】
function createStu(name) {
  var newObj = Object.create(personObj)
  newObj.name = name
  newObj.studying = function() {
    console.log('studying');
  }
  return newObj
}

var stuObj = createStu('qidou')
console.log(stuObj.name);
```

#### 6.8继承-寄生组合式继承

```js
function createObj(o) {
    var Fn() {}
    Fn.property = o
    return new Fn()
}
function inheritProperty(subType, superType) {
    subType.prototype = createObj(superType.prototype)
    Object.defineProperty(subType.property, 'constructor', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: subType
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
inheritProperty(Student, Person)
Student.prototype.ages = function() {
  console.log(`${this.name} is ${this.age} years`);
}
var stu = new Student('qidou', 22)
console.log(stu);//Person { name: 'qidou', age: 22 } 前面的Person类型在Student.prototype.constructor中找到name属性
console.log(Student.prototype.constructor.name); //Person 所以需要看15行的代码，修改指向
console.log(stu.constructor.name);//通过30行的代码，已经将类型改为Student
stu.ages() //qidou is 22 years
```

#### 6.9instanceof的判断

```js
function createObj(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}
function inheritPeoperty(subType, superType) {
    subType.prototype = createObj(superType.prototype)
    Object.defineProperty(subType.prototype, 'constructor', {
        enumable: false,
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
```

### 7.ES6中类的使用

#### 1.class定义类的方式

```js
class Person {}//声明类
var student = class {}//表达式

console.log(Person.prototype); //{}
console.log(Person.prototype.__proto__);//[Object: null prototype] {}
console.log(Person.prototype.constructor);//[class Person]
console.log(typeof Person); //function
```

#### 2.class的构造方法

```js
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
```

#### 3.class中的方法定义

```js
var names = ['qidou', 'zx', 'js']
var ages = ['22', '23', '28']
class Person{
    constructor(name, age) {
        this.name = name
        this.age = age
        this._perhaps = 'type'
    }
    
    //普通的实例方法
    coding() {
        console.log(`${this.name} love coding`)
    }
    
    //类的访问方法
    get perhaps() {
        console.log('拦截访问操作')
        return this._perhaps
    }
    set perhaps(newVal) {
        console.log('拦截设置操作')
        this._perhaps = newVal
    }
    //类的静态方法
    //使用Person.createPerson调用
    static createPerson() {
        var nameIndex = Math.floor(Math.random() * names.length)
        var ageIndex = Math.floor(Math.random() * ages.length)
        
        var name = names[nameIndex]
        var age = ages[ageIndex]
        
        return new Person(name, age)
    }
}

var qidou = new Person('企斗， 22')
// console.log(Object.getOwnPropertyDescriptors(Person.prototype)); //coding代码在Person的原型中

console.log(qidou.perhaps);
qidou.perhaps = 'maybe'
console.log(qidou.perhaps);

for(var i = 0; i < 5; i++) {
  console.log(Person.createPerson());
}
```

#### 4.class中实现继承extends

```js
class Person{
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  coding() {
    console.log('coding');
  }

  PersonMethod() {
    console.log('Person代码语句');
  }

  static staticMethod() {
    console.log('Person中的静态方法');
  }
}
// Student也称为子类（派生类）
  class Student extends Person{
    //JS解析子类使用super实现继承
    constructor(name, age, sno) {
      super(name, age)
      this.sno = sno
    }
    //子类重写父类方法
    PersonMethod() {
      super.PersonMethod()
      console.log('子类函数代码');
    }

    static staticMethod() {
      super.staticMethod()
      console.log('不使用父类是重写静态方法');
    }

  }

var qidou = new Student('qidou', 23, 100)
console.log(qidou);
qidou.coding()
console.log(Object.getOwnPropertyDescriptors(qidou.__proto__));//coding方法跟Person绑定
qidou.PersonMethod();
Person.staticMethod()
Student.staticMethod()
```

#### 5.创建类继承内置类

```js
class findIndex extends Array{
    firstIndex() {
        return this[0]
    }
    lastIndex() {
        return this[this.length - 1]
    }
}

var arr = new findIndex(1, 2, 3)
console.log(arr.firstIndex())
console.log(arr.lastIndex())
```

#### 6.JS中实现混入效果

```js
class Person {
  constructor(name) {
    this.name = name
  }
}

function mixinRunner(baseClass) {
  return class newClass extends baseClass{
    running() {
      console.log('running~');
    }
  }
}

function mixinEater(baseClass) {
  return class extends baseClass{
    eatting() {
      console.log('eatting~');
    }
  }
}
//Js中类只有一个父类： 单继承
class Student extends Person {

}

var newStu = mixinEater(mixinRunner(Student))
var qidou = new newStu('qidou')
console.log(qidou.name);
qidou.running()
qidou.eatting()
```

#### 7.多态-传统意义

```js
//1. 必须有继承，是多态的前提
//2. 必须有重写(子类重写父类方法)
//3. 必须有父类引用指向子类对象
class Shape{}

class Rectange extends Shape{
    getArea() {
        return 'Rectange'
    }
}

class Triangle extends Shape{
    getArea() {
        return 'Triangle'
    }
}

var r = new Rectange()
var t = new Triangle()

function calcArea(shape) {
    console.log(shape.getArea())
}

console.log(r.getArea())
```

#### 8.多态-Js面向对象

```js
//多态： 对不同的数据类型进行同一个操作时，如果表现得行为不一样，则为多态
function calcArea(obj) {
    console.log(obj.getArea())
}

var obj1 = {
    getArea: function() {
        return 100
    }
}

calcArea(obj1)

class Person{
    getArea() {
        return 1000
    }
}
var p = new Person()
calcArea(p)
```

### 8.ES6其他知识点

#### 1.模板字符串

```js
// ES6之前拼接字符串和其他标识符
const name = "qidou"
const age = 22

// console.log("my name is " + name + ", age is " + age)

// ES6提供模板字符串 ``
const message = `my name is ${name}, age is ${age}`
console.log(message)


const info = `age double is ${age * 2}`
console.log(info)

//调用函数使用
function doubleAge() {
  return age * 2
}
const info2 = `double age is ${doubleAge()}`
console.log(info2)
```

#### 2.标签模块字符串的使用

```js
// 第一个参数依然是模块字符串中整个字符串, 只是被切成多块,放到了一个数组中
// 第二个参数是模块字符串中, 第一个 ${}
function foo(m, n, x) {
  console.log(m, n, x, '---------')
}

// foo("Hello", "World")

// 另外调用函数的方式: 标签模块字符串
// foo``

// foo`Hello World`
const name = "why"
const age = 18
// ['Hello', 'Wo', 'rld']
foo`Hello${name}Wo${age}rld`
```

#### 3.ES6中函数的默认参数

```js
// ES5以及之前给参数默认值
/**
 * 缺点:
 *  1.写起来很麻烦, 并且代码的阅读性是比较差
 *  2.这种写法是有bug
 */
// function foo(m, n) {
//   m = m || "aaa"
//   n = n || "bbb"

//   console.log(m, n)
// }

// 1.ES6可以给函数参数提供默认值
function foo(m = "aaa", n = "bbb") {
  console.log(m, n)
}

// foo()
foo(0, "")

// 2.对象参数和默认值以及解构
function printInfo({name, age} = {name: "why", age: 18}) {
  console.log(name, age)
}

printInfo({name: "kobe", age: 40})

// 另外一种写法
function printInfo1({name = "why", age = 18} = {}) {
  console.log(name, age)
}

printInfo1()

// 3.有默认值的形参最好放到最后
function bar(x, y, z = 30) {
  console.log(x, y, z)
}

// bar(10, 20)
bar(undefined, 10, 20)

// 4.有默认值的函数的length属性
function baz(x, y, z, m, n = 30) {
  console.log(x, y, z, m, n)
}

console.log(baz.length)
```

#### 4.ES6中函数的剩余参数

```js
// function foo(...args, m, n) {
//   console.log(m, n)
//   console.log(args)

//   console.log(arguments)
// }

// foo(20, 30, 40, 50, 60)


// rest paramaters必须放到最后
// Rest parameter must be last formal parameter

// function foo(m, n = m + 1) {
//   console.log(m, n)
// }

// foo(10);
```

#### 5.ES6中箭头函数的补充

```js
// function foo() {

// }

// console.log(foo.prototype)
// const f = new foo()
// f.__proto__ = foo.prototype

var bar = () => {
  console.log(this, arguments)
}
console.log(bar.prototype) //undefined

// bar is not a constructor
const b = new bar()
```

#### 6.ES6中展开语法的使用

```js
const names = ["abc", "cba", "nba"]
const name = "why"
const info = {name: "why", age: 18}

// 1.函数调用时
function foo(x, y, z) {
  console.log(x, y, z)
}

// foo.apply(null, names)
foo(...names) //abc cba nba
foo(...name) //w h y

// 2.构造数组时
const newNames = [...names, ...name]
console.log(newNames)
//[ 'abc', 'cba', 'nba', 'w', 'h', 'y' ]

// 3.构建对象字面量时ES2018(ES9)
const obj = { ...info, address: "广州市", ...names }//{'0': 'abc'}
console.log(obj)
/*
{
  '0': 'abc',
  '1': 'cba',
  '2': 'nba',
  name: 'why',
  age: 18,
  address: '广州市'
}
*/
```

#### 7.展开语法的浅拷贝

```js
const info = {
  name: "why",
  friend: { name: "kobe" }
}

const obj = { ...info, name: "coderwhy" }
// console.log(obj)
obj.friend.name = "james"

console.log(info.friend.name)
```

#### 8.Symbol的基本使用方式

表示独一无二的属性

```js
// 1.ES6之前, 对象的属性名(key)
// var obj = {
//   name: "why",
//   friend: { name: "kobe" },
//   age: 18
// }


// obj['newName'] = "james"
// console.log(obj)


// 2.ES6中Symbol的基本使用
const s1 = Symbol()
const s2 = Symbol()

console.log(s1 === s2)

// ES2019(ES10)中, Symbol还有一个描述(description)
const s3 = Symbol("aaa")
console.log(s3.description) //aaa


// 3.Symbol值作为key
// 3.1.在定义对象字面量时使用
const obj = {
  [s1]: "abc",
  [s2]: "cba"
}

// 3.2.新增属性
obj[s3] = "nba"

// 3.3.Object.defineProperty方式
const s4 = Symbol()
Object.defineProperty(obj, s4, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "mba"
})

console.log(obj[s1], obj[s2], obj[s3], obj[s4])
// 注意: 不能通过.语法获取
// console.log(obj.s1)

// 4.使用Symbol作为key的属性名,在遍历/Object.keys等中是获取不到这些Symbol值
// 需要Object.getOwnPropertySymbols来获取所有Symbol的key
console.log(Object.keys(obj))//[]
console.log(Object.getOwnPropertyNames(obj))//[]
console.log(Object.getOwnPropertySymbols(obj))//[ Symbol(), Symbol(), Symbol(aaa), Symbol() ]
const sKeys = Object.getOwnPropertySymbols(obj)
for (const sKey of sKeys) {
  console.log(obj[sKey]) //abc cba nba mba
}

// 5.Symbol.for(key)/Symbol.keyFor(symbol)
const sa = Symbol.for("aaa")
const sb = Symbol.for("aaa")
console.log(sa === sb)//true

const key = Symbol.keyFor(sa)
console.log(key)//aaa
const sc = Symbol.for(key)
console.log(sa === sc)//true
```

#### 9.新增数据结构Set的使用

存储任何类型的值或者对象

```js
// 10, 20, 40, 333
// 1.创建Set结构
const set = new Set()
set.add(10)
set.add(20)
set.add(40)
set.add(333)

set.add(10)//无法添加相同对象

// 2.添加对象时特别注意: 两个内存地址不同， 所以可以一起添加进去
set.add({})
set.add({})

const obj = {}//obj的地址是相同的，所以只添加一个
set.add(obj)
set.add(obj)

// console.log(set)

// 3.对数组去重(去除重复的元素)
const arr = [33, 10, 26, 30, 33, 26]
// const newArr = []
// for (const item of arr) {
//   if (newArr.indexOf(item) !== -1) {
//     newArr.push(item)
//   }
// }

const arrSet = new Set(arr)
//set类型转换为array两个方法
// 1.const newArr = Array.from(arrSet)
// 2.const newArr = [...arrSet]
// console.log(newArr)

// 4.size属性
console.log(arrSet.size)

// 5.Set的方法
// add
arrSet.add(100)
console.log(arrSet)

// delete
arrSet.delete(33)
console.log(arrSet)

// has
console.log(arrSet.has(100)) //true

// clear
// arrSet.clear()
console.log(arrSet)//Set(0){}

// 6.对Set进行遍历
arrSet.forEach(item => {
  console.log(item)
})

for (const item of arrSet) {
  console.log(item)
}
```

#### 10.新增数据结构WeakSet的使用

只能存放对象类型

```js
const weakSet = new WeakSet()
// weakSet不能遍历
// 1.区别一: 只能存放对象类型
// TypeError: Invalid value used in weak set
// weakSet.add(10)

// 强引用和弱引用的概念(看图)
// 强引用： 在GC(垃圾回收机制)中，对于对象的指向有地址的为强引用，不会被回收
// 弱引用： GC中， 会根据obj的指针指向来决定内存是否被回收
// 2.区别二: 对对象是一个弱引用
let obj = { 
  name: "why"
}

// weakSet.add(obj)

const set = new Set()
// 建立的是强引用
// set.add(obj)//obj = null obj指向修改的时候，强引用不会回收之前obj指向的地址

// 建立的是弱引用
weakSet.add(obj) //obj = null 弱引用会因为obj的指向，而释放掉指向的内存地址, 使用ES12的方法可以手动完成被回收

const finalRegistry = new FinalizationRegistry(() => {
  console.log('注册在内部的某个函数被销毁');
})

finalRegistry.register(obj)


// 3.WeakSet的应用场景
const personSet = new WeakSet()
class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error("不能通过非构造方法创建出来的对象调用running方法")
    }
    console.log("running~", this)
  }
}

let p = new Person()
p.running()
// p = null


// p.running.call({name: "why"})

```

#### 11.新增数据结构Map的使用

保存键值对

```js
// 1.JavaScript中对象中是不能使用对象来作为key的
const obj1 = { name: "why" }
const obj2 = { name: "kobe" }

// const info = {
//   [obj1]: "aaa",
//   [obj2]: "bbb"
// }

// console.log(info)
//Map(3) {
//   { name: 'why' } => 'aaa',
//   { name: 'kobe' } => 'bbb',
//   1 => 'ccc'
// }
// 2.Map就是允许我们对象类型来作为key的
// 构造方法的使用
const map = new Map()
map.set(obj1, "aaa")
map.set(obj2, "bbb")
map.set(1, "ccc")
console.log(map)

const map2 = new Map([[obj1, "aaa"], [obj2, "bbb"], [2, "ddd"]])
console.log(map2)

// 3.常见的属性和方法
console.log(map2.size)

// set
map2.set("why", "eee")
console.log(map2)

// get(key)
console.log(map2.get("why"))

// has(key) true/false 
console.log(map2.has("why"))

// delete(key) true/false
map2.delete("why")
console.log(map2)

// clear
// map2.clear()
// console.log(map2) Map(0){}

// 4.遍历map
map2.forEach((item, key) => {
  console.log(item, key)
})

for (const item of map2) { //数组存放键值对， 0为键 ，1为值  [{name: 'key'}, 'aaa']
  console.log(item[0], item[1])
}

for (const [key, value] of map2) {
  console.log(key, value)
}
```

#### 12.新增数据结构WeakMap的使用

```js
const obj = {name: "obj1"}
// 1.WeakMap和Map的区别二:
const map = new Map()
map.set(obj, "aaa")

const weakMap = new WeakMap()
weakMap.set(obj, "aaa")

// 2.区别一: 不能使用基本数据类型作为key
// weakMap.set(1, "ccc")

// 3.常见方法
// get方法
console.log(weakMap.get(obj))

// has方法
console.log(weakMap.has(obj))

// delete方法
console.log(weakMap.delete(obj))
console.log(weakMap)
// WeakMap { <items unknown> }  weakMap不能遍历
//WeakMap没clean forEach方法
```

#### 13.vue3的响应式原理，WeakMap的使用

```js
// 应用场景(vue3响应式原理)
const obj1 = {
  name: "why",
  age: 18
}

function obj1NameFn1() {
  console.log("obj1NameFn1被执行")
}

function obj1NameFn2() {
  console.log("obj1NameFn2被执行")
}

function obj1AgeFn1() {
  console.log("obj1AgeFn1")
}

function obj1AgeFn2() {
  console.log("obj1AgeFn2")
}

const obj2 = {
  name: "kobe",
  height: 1.88,
  address: "广州市"
}

function obj2NameFn1() {
  console.log("obj1NameFn1被执行")
}

function obj2NameFn2() {
  console.log("obj1NameFn2被执行")
}

// 1.创建WeakMap
const weakMap = new WeakMap()

// 2.收集依赖结构
// 2.1.对obj1收集的数据结构
const obj1Map = new Map()
obj1Map.set("name", [obj1NameFn1, obj1NameFn2])
obj1Map.set("age", [obj1AgeFn1, obj1AgeFn2])
weakMap.set(obj1, obj1Map)

// 2.2.对obj2收集的数据结构
const obj2Map = new Map()
obj2Map.set("name", [obj2NameFn1, obj2NameFn2])
weakMap.set(obj2, obj2Map)

// 3.如果obj1.name发生了改变
// Proxy/Object.defineProperty
obj1.name = "james"
const targetMap = weakMap.get(obj1)
const fns = targetMap.get("name")
fns.forEach(item => item())
```

### 9.ES7知识点

#### 1.includes

```js
var names = ['1', '2', NaN]
//indexOf无法判断NaN类型
console.log(names.indexOf(NaN));//-1

//includes参数 查询元素 索引下标开始
console.log(names.includes('2', 1));//true
//可以判断NaN类型
console.log(names.includes(NaN))//true
```

#### 2.指数运算符

```js
const num1 = Math.pow(3, 3)

const num2 = 3 ** 3

console.log(num1, num2);
```

### 10.ES8知识点

#### 1.Object.values

```js
const obj = {
    name: 'qidou',
    age: 22
}

console.log(Object.keys(obj));//[ 'name', 'age' ]
console.log(Object.values(obj));//[ 'qidou', 22 ]

console.log(Object.values(['abc', 'cba', 'nba']));//[ 'abc', 'cba', 'nba' ]
console.log(Object.values('abc'));//[ 'a', 'b', 'c' ]
```

#### 2.Object.entries

```js
//通过0bject.entries可以获取到一个数组,数组中会存放可枚举属性的键值对数组。
var obj = {
  name: 'qidou',
  age: 22,
}

console.log(Object.entries(obj));//[ [ 'name', 'qidou' ], [ 'age', 22 ] ]

const entriesObj = Object.entries(obj)

entriesObj.forEach(item => {
  console.log(item[0], item[1]);//name qidou   age 22
})

console.log(Object.entries(['abc', 'cba', 'nba']));//[ [ '0', 'abc' ], [ '1', 'cba' ], [ '2', 'nba' ] ]
console.log(Object.entries('abc'));//[ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
```

#### 3.String.padStart_padEnd

```js
let str = 'Hello World'
//填充后的字符长度， 填充符
var newStr = str.padStart(15, '-').padEnd(19, '-')
console.log(newStr);//----Hello World----

//案例
const card = '1231251252143214215124'
const cardLastFourNum = card.slice(-4)
let newCard = cardLastFourNum.padStart(card.length, '*')
console.log(newCard);//******************5124

newCard = card.replaceAll(/^(\d{18})(\d{4})/g, `******************$2`);
console.log(newCard);
```

#### 4.Trailing-commas

```js
function foo(x, y,) {
  
}

foo(1, 2,)
```

#### Async function 后续单独讲解

### 11.ES9知识点

#### Async iterators 迭代器

#### Object spread operators 展开运算符 

#### Promise finally Promise

### 12.ES10知识点

#### 1.flat和flatMap

```js
const nums = [1, 2, [3, 4], 5, [[6, 7], 8], 9]
// flat
const newNums = nums.flat(Infinity) //deep
console.log(newNums);

// flapMap
// 1. 先进行Map操作映射每个元素， 再做flat操作
// 2. flat操作相当于deep为1
const nums2 = [10, 20, 30]
const newNums2 = nums2.flatMap(item => {
  return item * 2
})

const newNums3 = nums2.map(item => {
  return item * 2
})

console.log(newNums2, newNums3);//[ 20, 40, 60 ] [ 20, 40, 60 ]

//实际应用场景
const message = ['Hello World', 'cool Guy', 'See U']
//使用循环遍历+扁平化方法
// let newMsgs = []
// const newMsg = message.forEach(item => {
//   item = item.split(' ')
//   newMsgs = [...newMsgs, item]
//   newMsgs = newMsgs.flat(Infinity)
//   return newMsgs
// })

// console.log(newMsgs); //[ 'Hello', 'World', 'cool', 'Guy', 'See', 'U' ]

//使用flatMap方法
//先映射Map，得到结果[ [ 'Hello', 'World' ], [ 'cool', 'Guy' ], [ 'See', 'U' ] ]
// 使用flat， 得到最终结果
const newMsg = message.flatMap(item => {
  return item.split(' ')
})
console.log(newMsg); //[ 'Hello', 'World', 'cool', 'Guy', 'See', 'U' ]
```

#### 2.Object.fromEntries

```js
const obj = {
  name: 'qidou',
  age: 23
}

//entries 对象转数组
const entries = Object.entries(obj)
console.log(entries); //[ [ 'name', 'qidou' ], [ 'age', 23 ] ]

// fromEntries 数组转对象
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries); //{ name: 'qidou', age: 23 }

// 数组转对象其他方法
const newObj = {}
for(let [name, age] of entries) {
  newObj[name] = age
}
  
entries.forEach((item, key) => {
  newObj[item[0]] = item[1] 
})
console.log(newObj);

//应用场景
const queryString = 'name=qidou&age=22'
const queryParams = new URLSearchParams(queryString)
console.log(queryParams);//URLSearchParams { 'name' => 'qidou', 'age' => '22' } 类似Map结构

for(const param of queryParams) {
  console.log(param);
  //[ 'name', 'qidou' ]
  // [ 'age', '22' ]
}

const paramObj = Object.fromEntries(queryParams)
console.log(paramObj);//{ name: 'qidou', age: '22' }
```

#### 3.trimStart-trimEnd

```js
const msg = ' Hello '

console.log(msg.trim());//ES5
console.log(msg.trimStart().trimEnd());//ES10
```

#### 其他新增方法

##### Symbol description

```js
const aaa = Symbol('aaa')
console.log(aaa);//Symbol(aaa)
```

##### Option catch binding // 后面讲解try catch

### 13.ES11知识点

#### 1.BigInt

```js
// ES11前的最大安全整数
const maxInt = Number.MAX_SAFE_INTEGER
console.log(maxInt); //9007199254740991 53次方

// ES11
const bigInt = 90071992547409911n//添加n为大数字
console.log(bigInt);

// console.log(bigInt + 10);//Cannot mix BigInt and other types, use explicit conversions
//BigInt无法进行隐式转换， 需要将数字类型转换为大数字， 然后操作
console.log(bigInt + BigInt(10));
```

#### 2.Nullish_coalescing_operator

```js
//空值合并运算符??

//以前的写法
const msg = 'receive the message' //'' null undefined三个情况需要额外判定
const result = msg || 'default value'

console.log(result);

//新的写法 ??
const newResult = msg ?? 'defaultvalue'

console.log(newResult);
```

#### 3.Optional-chaining

```js
// 可选链条 ?.

const obj = {
  name: 'qidou',
  friends: {
    name: 'lilei',
    girlFriend: {
      name: 'zhangdapao'
    }
  }
}
//之前的写法
if(obj && obj.friends && obj.friends.girlFriend) {
  console.log(obj.friends.girlFriend.name);
}

//?.
console.log(obj?.friends?.girlFriend?.name)
```

#### 4.globalThis

```js
console.log(globalThis);//根据当前浏览器 node环境， 自动识别this
```

#### 其他新增方法

#####  for...in 规范化，获取的是key

##### Dynamic Import 后续ES Module讲解

##### Promise.allSettled 后续Promise讲解

##### import meta 后续ES Module讲解

### 14.ES12知识点

#### 1.FinalizationRegistry

```js
let obj = { name: 'qidou'}

const finalRegistry = new FinalizationRegistry((value) => {
  console.log("注册在finalRegister的对象，某一个被销毁", value);
})
//注册事件， 第二个属性可以传标识符
finalRegistry.register(obj, 'qidou')
let secObj = { }
finalRegistry.register(secObj, 'sec')
obj = null
secObj = null

//WeakSet WeakMap
```

#### 2.WeakRef

```js
const finalRegistry = new FinalizationRegistry((value) => {
  console.log(`${value}函数被销毁`);
})

let obj = { name: 'qidou' }

//弱引用
// let purpose = new WeakSet()
// purpose.add(obj)

//weakRef.prototype.deref: 如果原对象没有被销毁，则返回该对象；如果销毁返回undefined
let info = new WeakRef(obj)


finalRegistry.register(obj, 'obj')

obj = null

setTimeout(() => {
  console.log(info.deref()?.name); //undefined
}, 10000);
```

#### 3.logical-assign-operator

```js
//||=逻辑或赋值运算
// let msg = '1'
// msg = msg || 'Default Value'

// msg ||= 'Default Value'

// console.log(msg);

//&&=逻辑与赋值运算

// &&
const obj = {
  name: 'qidou',
  foo: function() {
    console.log('foo函数被执行');
  }
}

obj && obj.foo()

//&&=
let info = {
  name: 'qidou'
}

info &&= info.name
console.log(info);//qidou

//3.??= 逻辑空判断 
//跟逻辑或差异在可以判断 [空字符串 || 0]

let msg = 0

msg ??= 'Default Value'

console.log(msg);
```


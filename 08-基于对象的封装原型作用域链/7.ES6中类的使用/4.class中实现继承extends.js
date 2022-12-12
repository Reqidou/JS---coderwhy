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

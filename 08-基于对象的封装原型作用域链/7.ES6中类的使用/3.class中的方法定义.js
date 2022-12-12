var names = ['1', '2', '3']
var hobbies = ['typing', 'coding', 'sleeping']
class Person{
  constructor(name, hobby) {
    this.name = name
    this.hobby = hobby
    this._perhaps = 'type'
  }
  //普通的实例方法
  coding() {
    console.log(`${this.name} love ${this.hobby}`);
  }
  //类的访问器方法
  get perhaps() {
    console.log('拦截访问操作');
    return this._perhaps
  }

  set perhaps(newPerhaps) {
    console.log('拦截设置操作');
    this._perhaps = newPerhaps
  }

  //类的静态方法
  //使用Person.createPerson()调用
  static createPerson() {
    var nameIndex = Math.floor(Math.random() * names.length)
    var hobbiesIndex = Math.floor(Math.random() * hobbies.length)
    var name = names[nameIndex]
    var hobby = hobbies[hobbiesIndex]
    return new Person(name, hobby)
  }
}
var qidou = new Person('qidou', 'coding')
console.log(qidou);
// console.log(Object.getOwnPropertyDescriptors(Person.prototype)); //coding代码在Person的原型中

console.log(qidou.perhaps);
qidou.perhaps = 'maybe'
console.log(qidou.perhaps);

for(var i = 0; i < 5; i++) {
  console.log(Person.createPerson());
}
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

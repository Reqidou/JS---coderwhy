//1. 必须有继承，是多态的前提
//2. 必须有重写(子类重写父类方法)
//3. 必须有父类引用指向子类对象
class Shape{
  getArea() {

  }
}

class Rectangular extends Shape {
  getArea() {
    return 100
  }
}

class Triangle extends Shape {
  getArea() {
    return 200
  }
}

var r = new Rectangular()
var t = new Triangle()

function calcArea(shape) {
  console.log(shape.getArea());
}
console.log(r);

calcArea(r)

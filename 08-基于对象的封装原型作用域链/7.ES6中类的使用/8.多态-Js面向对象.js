//多态： 对不同的数据类型进行同一个操作时，如果表现得行为不一样，则为多态
function calcArea(obj) {
  console.log(obj.getArea());
}

var obj1 = {
  name: 'qidou',
  getArea: function() {
    return 100
  }
}

class Person {
  getArea() {
    return 1000
  }
}

var p = new Person()

calcArea(obj1)
calcArea(p)
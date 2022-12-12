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
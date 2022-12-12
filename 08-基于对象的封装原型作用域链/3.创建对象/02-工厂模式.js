function createPerson(name, hobby) {
  var p = {}
  p.name = name
  p.hobby = function() {
    console.log(`${name}喜欢${hobby}`);
  }

  return p
}

var p1 = new createPerson('qidou', 'typing')
var p2 = new createPerson('qizzqdou', 'eating')
//工厂模式的优点：解决了字面量的代码重复问题
//工厂模式的缺点：获取不到对象的真实类型
console.log(p1, p2);
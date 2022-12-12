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
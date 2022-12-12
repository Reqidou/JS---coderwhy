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
var obj = {
  age: 22
}
//定义的变量在新建的对象中
var qidou = Object.create(obj, {
  name: {
    value: 'qidou',
    enumerable: true,
  }
})

console.log(qidou);
console.log(qidou.__proto__);

// 1.hasOwnProperty  判断某个属性是否在对象中
console.log(qidou.hasOwnProperty('name')); //true
console.log(qidou.hasOwnProperty('age')); //false

// 2.in 判断某个属性是否在对象或原型中
console.log('age' in qidou); //true
//hasOwnProperty
const obj = {
  name: 'qidou',
  hobby: 'coding',
  __proto__: {
    address: '山西'
  }
}
//区别1： 防止对象内部的方法因为重写而被覆盖
obj.hasOwnProperty = function(val) {
  console.log('重写了此方法', val);
}

console.log(obj.hasOwnProperty('name'), obj.hasOwnProperty('address'));

// 区别2： 防止因为指向的问题，而导致原型链指向不是Object
const objProperty = Object.create(null)
// try {
//   objProperty.hasOwnProperty('err')
// } catch(e) {
//   console.error(e);
// } 
// objProperty.hasOwnProperty('err')
//hasOwn
console.log(Object.hasOwn(obj, 'name'), Object.hasOwn(obj, 'address'));
const obj = {
  name: 'qidou',
  age: 18,
}

// Object.defineProperty(obj, 'name', {
//   configurable: false,
// })

Reflect.defineProperty(obj, 'name', {
  configurable: false
})

delete obj.name

let res = obj.name ? '删除不成功' : '删除成功'
console.log(res)

// Reflect
if(Reflect.deleteProperty(obj, 'name')) {
  console.log('name删除成功');
} else {
  console.log('name删除失败');
}
const obj = {
  name: 'qidou',
  age: 22
}

//弊端：
// 1.无法删除添加属性
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取了${key}的值`);
      return value
    },
    set(newValue) {
      value = newValue
      console.log(`修改了${key}的值`);
    }
  })
})

obj.name = 'zx'
console.log(obj.name);



const obj = {
  name: 'qidou',
  age: 24
}
// 1.创建新的代理对象
const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`监听到了${key}属性`);
    console.log(receiver);
    return target[key]
  },
  set(target, key, newValue, receiver) {
    target[key] = newValue
    console.log(`监听到${key}的值更改为${newValue}`);
  },
  deleteProperty(target, key) {
    console.log(`监听到${key}属性被删除`);
    delete target[key]
  },
  has(target, key) {
    console.log(`监听到in操作符判断${key}属性`);
    return key in target
  }
})

// 2.对obj的所有操作， 直接操作objProxy
console.log(objProxy.name);
objProxy.name = 'zx'
console.log(objProxy.name);

//删除属性
delete objProxy.name
console.log(objProxy);
//判断是否存在
console.log('name' in objProxy);
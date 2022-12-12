const obj = {
  name: 'qidou',
  age: 22
}

const objProxy = new Proxy(obj, {
  //获取值的捕获器
  get(target, key) {
    console.log(`监听到obj对象的${key}属性被获取`, target);
    return target[key]
  },
  //设置值的捕获器
  set(target, key, newValue) {
    console.log(`监听到obj对象的${key}属性被修改`, target);
    target[key] = newValue
  },
  //监听in捕获器
  has: function(target, key) {
    console.log(`监听到${target}对象的${key}属性进行in操作`, target);
    return key in target 
  },
  //监听delete捕获器
  deleteProperty: function(target, key) {
    console.log(`监听到${target}对象的${key}属性进行delete操作`, target);
    return delete target[key]
  },
  //获取属性捕捉器
  getPrototypeOf(target) {
    console.log(`监听到获取了${target}对象`, target);
    return 'name'
  },
  //设置属性捕捉器
  setPrototypeOf(target, key) {
    console.log(`监听到将${target}对象的${key}属性更改为${newValue}`, target);
    target[key] = newValue
  }
})

objProxy.name = 'zx'
console.log(objProxy.name);

//in操作符
console.log('name' in objProxy);

//delete操作符
console.log(delete objProxy.name);

//获取属性
console.log(Object.getPrototypeOf(objProxy) === 'name');

// objProxy.age

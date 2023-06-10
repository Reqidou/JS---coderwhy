const obj = {
  name: 'qidou',
  age: 24
}

const objProxy = new Proxy(obj, {
  set(target, key, newValue, receiver) {
    //原始操作对象写法
    // target[key] = newValue
    
    //好处一： 不需要直接操作原对象
    // 好处二： Reflect.set()方法返回布尔类型， 可以判断本次是否成功
    const isSuccess = Reflect.set(target, key, newValue)

    if(!isSuccess) {
      throw new Error(`set ${key} failure`)
    }
  },
  get(target, key, receiver) {
    
  }
})

//操作代理对象
objProxy.name = 'zx'
console.log(obj);
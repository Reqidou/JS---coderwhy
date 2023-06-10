const obj = {
  _name: 'qidou',
  set name(newValue) {
    console.log(`this:${this}`);
    this._name = newValue
  },
  get name() {
    return this._name
  }
}

const objProxy = new Proxy(obj, {
  set(target, key, newValue, receiver) {
    //原始操作对象写法
    // target[key] = newValue
    
    //好处一： 不需要直接操作原对象
    // 好处二： Reflect.set()方法返回布尔类型， 可以判断本次是否成功
    console.log('Proxy中的方法被调用');
    
    //好处三 receiver就是proxy
      //Reflect的get/set方法的receiver参数可以决定this的指向
    const isSuccess = Reflect.set(target, key, newValue, receiver)//receiver可以将将proxy传递到obj对象的set方法，可以更改this的指向，防止因为操控原数组而导致只能获取一次get请求
    console.log(receiver);

    if(!isSuccess) {
      throw new Error(`set ${key} failure`)
    }
  },
  get(target, key, receiver) {
    console.log('Proxy中的get方法被调用');
    return Reflect.get(target, key, receiver)
  }
})

//操作代理对象
// objProxy.name = 'zx'
console.log(objProxy.name);
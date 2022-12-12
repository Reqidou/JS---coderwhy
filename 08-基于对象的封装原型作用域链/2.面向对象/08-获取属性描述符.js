const obj = {
  _age: 18,
}

Object.defineProperties(obj, {
  name: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: 'qidou',
  },
  //如果属性的默认为true， 可简写。第三行开始的方法
  age: {
    configurable: true,
    enumerable: true,
    get() {
      return this._age
    },
    set(value) {
      this._age = value
    }
  }
})

console.log(Object.getOwnPropertyDescriptor(obj, 'age'));
console.log(Object.getOwnPropertyDescriptors(obj));
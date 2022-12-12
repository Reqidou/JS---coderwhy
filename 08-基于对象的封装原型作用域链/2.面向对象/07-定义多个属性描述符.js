const obj = {
  _age: 18,
  //如果属性的默认值皆为true，则可用这种写法
  // set age(value) {
  //   this._age = value
  // },
  // get age() {
  //   return this._age
  // }
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
obj.age = 24
console.log(obj);
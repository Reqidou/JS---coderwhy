var obj = {
  //enumerable: true
  //configurable: true
  //writable: true
  name: 'qidou', //value
  _hate: '内部私有变量，隐藏'
}

function getDate() {
  console.log(`获取${this._hate}属性`);
}
function setDate() {
  console.log('设置了属性值');
}
//Vue2的原理 defineProperty
//1.隐藏某一私有属性，直接被外界使用，赋值
// 2.截获某一属性访问和设置的过程，使用属性描述符
Object.defineProperty(obj, 'hate', {
  configurable: true,
  enumerable: true,
  get: function() {
    getDate.call(this)
    return this._hate
  },
  set: function(value) {
    setDate()
    this._hate = value
  }
})
console.log(obj.hate);
obj.hate = '修改'
console.log(obj.hate);
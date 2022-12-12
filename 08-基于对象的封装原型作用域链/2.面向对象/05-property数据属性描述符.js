var obj = {
  //enumerable: true
  //configurable: true
  //writable: true
  name: 'qidou', //value
  hobby: function() {
    console.log('HiHi');
  }
}

Object.defineProperty(obj, 'hate', {
  //configurable:
    //1. 可以避免数据属性被删除
    //2. 也可以防止被再次定义
  configurable: false, //false
  //该属性是否枚举
  enumerable: true, //false
  //该属性是否允许重写
  writable: false, //false
  value: '疫情封城', //undefined
})

//configurable
// 1. 可以避免数据属性被删除
// delete obj.hate
// console.log(obj.hate); //疫情封城

//2. 也可以防止被再次定义
// Object.defineProperty(obj, 'hate', {
//     //2. 也可以防止被再次定义
//   configurable: false,
//   value: '疫情封城2',
// }) // err

//enumerable //可枚举
// console.log(obj);

// 3.writable 禁止重写  strict严格模式： 静默错误， 报错
// obj.hate = '123'
// console.log(obj.hate); //疫情封城
Function.prototype.zxcall = function(thisArg, ...args) { //剩余参数传递
  console.log('zxcall被调用');
  // 1.获取需要调用的函数
  var fn = this

  // 3. 数据类型转换， 防止数字， 字符串无法添加属性
  // thisArg = Object(thisArg)
  // 3.5 防止传入null，undefined空值
  thisArg = thisArg ? Object(thisArg) : window
  // 2.调用函数， thisArg指向函数内部的this。
  // fn.call(thisArg)
  // 2.给函数内部添加fn方法
  thisArg.fn = fn
  // 4. 展开参数 将最终结果返回
  var result = thisArg.fn(...args)

  //调用后删除fn属性
  delete thisArg.fn

  return result
}

function foo() {
  // 2.获取this指向
  console.log('foo函数被调用', this);
}
//剩余参数传递
function sum(num1, num2) {
  console.log('sum函数被调用', this, num1, num2);
  return num1 + num2
}

//1. 隐式绑定foo， 所以会将foo传入函数内， 调用foo函数
//2. 括号内为调用参数
foo.zxcall({name: 'qidou', age: 22})

//测试 3 数据类型转换
foo.zxcall(123)
//测试 3.5 null undefined
foo.zxcall(undefined)

//测试4 函数剩余参数传递
var result = sum.zxcall({}, 20, 30)
console.log(result);
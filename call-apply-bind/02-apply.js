Function.prototype.zx_apply = function(thisArg, argArray) {
  console.log('zx_apply被调用');

  var fn = this

  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

  thisArg.fn = fn 
  var result
  //判断剩余参数是否存在
  // if(!argArray) {
  //   result = thisArg.fn()
  // } else {
  //   result = thisArg.fn(...argArray)
  // }
  //简写
  // argArray = argArray ? argArray : []
  argArray = argArray || []
  result = thisArg.fn(...argArray)

  delete thisArg.fn

  return result
}

function foo() {
  console.log('foo函数被调用', this);
}

function sum(num1, num2) {
  console.log('sum被调用',this, num1, num2);
  return num1 + num2
}

foo.zx_apply({name: 'qidou'})

var result = sum.zx_apply("abc", [20, 30])
console.log(result);
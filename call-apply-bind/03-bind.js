Function.prototype.zx_bind = function(thisArgs, ...argArray) {
  // 1.获取需要调用的函数
  var fn = this
  // 2.绑定this
  thisArgs = (thisArgs !== null && thisArgs !== undefined) ? Object(thisArgs) : window

  function proxyFn(...args) {
    thisArgs.fn = fn
    const finalArgs = [...argArray, ...args]
    var result = thisArgs.fn(...finalArgs)
    delete thisArgs.fn
    return result
  }

  return proxyFn
}

function foo() {
  console.log('foo函数被调用', this);
  return 20
}

var bar = foo.zx_bind({})
var result = bar()
console.log(result);

function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4
}
var bars = sum.zx_bind({}, 20, 30)
var result = bars(40, 50)
console.log(result);

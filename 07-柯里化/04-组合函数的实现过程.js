function compose(...fns) {
  var length = fns.length
  for(let i = 0; i < length; i++) {
    if(typeof fns[i] !== 'function') {
      throw new TypeError('all arguments are functions')
    }
  }

  return function(...args) {
    var index = 0
    var result = length ? fns[index].apply(this, args) : args
    while(++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
}
function double(num) {
  return num * 2
}
function sqare(num) {
  return num ** 2
}

var newFn = compose(double, sqare)
console.log(newFn(5));
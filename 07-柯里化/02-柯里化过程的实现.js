function _currying(fn) {
 function curried(...args) {
    if(args.length >= fn.length) {
      return fn.apply(this, args)
    }
    else {
      function curried2(...args2) {
        return curried.apply(this, [...args, ...args2])
      }
      return curried2
    }
  }

  return curried
}

function add1(x, y) {
  return x + y
}

var curryAdd = _currying(add1)
console.log(curryAdd(5)(10)); 
console.log(_currying(add1)(5)(5));
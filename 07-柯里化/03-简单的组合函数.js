function double(num) {
  return num * 2
}
function sqare(num) {
  return num ** 2
}

function composeFn(m, n) {
  return function(count) {
    return n(m(count))
  }
}

var newFn = composeFn(sqare, double)
console.log(newFn(10));
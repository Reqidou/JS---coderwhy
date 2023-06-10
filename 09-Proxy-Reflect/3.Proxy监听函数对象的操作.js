function foo(num1, num2) {
  console.log(this, num1, num2);
}

const fooProxy = new Proxy(foo, {
  apply(target, thisArg, otherArgs) {
    console.log('监听执行了apply操作');
    target.apply(thisArg, otherArgs)
  },
  construct(target, otherArray) {
    console.log(`监听到了new关键字创建对象`);
    console.log(target, otherArray);
    return new target(...otherArray)
  }
})

fooProxy.apply('abc', [111, 222])

new fooProxy('aaa', 'bbb')
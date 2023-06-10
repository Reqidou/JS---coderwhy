function* foo() {
  console.log('执行内部代码：111')
  yield 'aaa'
  console.log('执行内部代码：222')
  yield 'bbb'
  //2. 在中间位置直接return结果
  // return 'res'
  console.log('执行内部代码：333')
  return undefined
}

const generator = foo()

//1. 调用next方法
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

//2. 中间位置直接return结果
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

//3. 给生成器传递参数
// 由于传递参数过于复杂， 脑容量不够， 所以重新写一遍， 用来加深印象

  //1. 定义生成器
  function* bar(res1) {
    console.log('执行内部代码111', res1);
    const res2 = yield 'console.log打印的结果'
    console.log('执行内部代码222', res2);
    const res3 = yield 'value的值'
    console.log('执行内部代码333', res3);
    yield 'Final'
    console.log('最后一次执行');
    return undefined
  }
  //新建实例
  const generator1 = bar('第一次传递的参数')
  console.log(generator1.next());
  console.log(generator1.next('第二次传递的参数'));
  console.log(generator1.next('第3次传递的参数'));
  console.log(generator1.next());

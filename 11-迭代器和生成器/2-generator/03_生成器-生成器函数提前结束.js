function* foo(res1) {
  console.log('内部第一次执行', res1);
  const res2 = yield 'return的结果:value'
  console.log('内部第二次执行，并且获取第二次传递的参数：', res2);
  yield 'Final'
  console.log('Bye World');
  return undefined
}
try {
  const generator = foo('第一次从传递的参数')
  console.log(generator.next());
  //return 返回
  // console.log(generator.return()); // 只执行第一次yield之前的代码， 后面可以传参， 但是不会执行语句
  
  console.log(generator.next('第二次传递的参数'));
  //throw new Error
  console.log(generator.throw(new Error('err')));
  console.log(generator.next());
} catch(e) {
  console.log(e);
}
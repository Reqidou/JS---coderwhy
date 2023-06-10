//生成器的语法为function*
// 代码执行可以被yieId控制
// 生成器函默认在执行时，返回一个生成器对象
//  *当遇到yieId时，会中断执行
//  *要执行函数内部的代码， 需要生成器对象， 调用它的next操作
function* foo() {
  console.log(111);
  console.log(222);
  yield
  console.log(333);
  console.log(444);
  yield
  console.log(555);
  console.log(666);
}

const generator = foo()

generator.next()
generator.next()
generator.next()
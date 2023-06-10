// "use strict";
var obj = {name: '张三丰', msg: '呐呐呐'}
function foo() {
  function bar() {
    msg = 100
    with(obj) { //with没办法在严格模式运行， 会报错
      console.log(this, msg);
    }
  }

  bar()
}

foo()
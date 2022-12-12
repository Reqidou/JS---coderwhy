let obj = { name: 'qidou'}

const finalRegistry = new FinalizationRegistry((value) => {
  console.log("注册在finalRegister的对象，某一个被销毁", value);
})
//注册事件， 第二个属性可以传标识符
finalRegistry.register(obj, 'qidou')
let secObj = { }
finalRegistry.register(secObj, 'sec')
obj = null
secObj = null

//WeakSet WeakMap
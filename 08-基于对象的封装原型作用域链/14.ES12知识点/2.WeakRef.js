const finalRegistry = new FinalizationRegistry((value) => {
  console.log(`${value}函数被销毁`);
})

let obj = { name: 'qidou' }

//弱引用
// let purpose = new WeakSet()
// purpose.add(obj)

//weakRef.prototype.deref: 如果原对象没有被销毁，则返回该对象；如果销毁返回undefined
let info = new WeakRef(obj)


finalRegistry.register(obj, 'obj')

obj = null

setTimeout(() => {
  console.log(info.deref()?.name); //undefined
}, 10000);




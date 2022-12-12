const weakSet = new WeakSet()
// weakSet不能遍历
// 1.区别一: 只能存放对象类型
// TypeError: Invalid value used in weak set
// weakSet.add(10)

// 强引用和弱引用的概念(看图)
// 强引用： 在GC(垃圾回收机制)中，对于对象的指向有地址的为强引用，不会被回收
// 弱引用： GC中， 会根据obj的指针指向来决定内存是否被回收
// 2.区别二: 对对象是一个弱引用
let obj = { 
  name: "why"
}

// weakSet.add(obj)

const set = new Set()
// 建立的是强引用
// set.add(obj)//obj = null obj指向修改的时候，强引用不会回收之前obj指向的地址

// 建立的是弱引用
weakSet.add(obj) //obj = null 弱引用会因为obj的指向，而释放掉指向的内存地址, 使用ES12的方法可以手动完成被回收

const finalRegistry = new FinalizationRegistry(() => {
  console.log('注册在内部的某个函数被销毁');
})

finalRegistry.register(obj)


// 3.WeakSet的应用场景
const personSet = new WeakSet()
class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error("不能通过非构造方法创建出来的对象调用running方法")
    }
    console.log("running~", this)
  }
}

let p = new Person()
p.running()
// p = null


// p.running.call({name: "why"})

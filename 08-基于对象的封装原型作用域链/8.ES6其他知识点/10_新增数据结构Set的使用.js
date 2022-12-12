// 10, 20, 40, 333
// 1.创建Set结构
const set = new Set()
set.add(10)
set.add(20)
set.add(40)
set.add(333)

set.add(10)//无法添加相同对象

// 2.添加对象时特别注意: 两个内存地址不同， 所以可以一起添加进去
set.add({})
set.add({})

const obj = {}//obj的地址是相同的，所以只添加一个
set.add(obj)
set.add(obj)

// console.log(set)

// 3.对数组去重(去除重复的元素)
const arr = [33, 10, 26, 30, 33, 26]
// const newArr = []
// for (const item of arr) {
//   if (newArr.indexOf(item) !== -1) {
//     newArr.push(item)
//   }
// }

const arrSet = new Set(arr)
//set类型转换为array两个方法
// 1.const newArr = Array.from(arrSet)
// 2.const newArr = [...arrSet]
// console.log(newArr)

// 4.size属性
console.log(arrSet.size)

// 5.Set的方法
// add
arrSet.add(100)
console.log(arrSet)

// delete
arrSet.delete(33)
console.log(arrSet)

// has
console.log(arrSet.has(100)) //true

// clear
// arrSet.clear()
console.log(arrSet)//Set(0){}

// 6.对Set进行遍历
arrSet.forEach(item => {
  console.log(item)
})

for (const item of arrSet) {
  console.log(item)
}


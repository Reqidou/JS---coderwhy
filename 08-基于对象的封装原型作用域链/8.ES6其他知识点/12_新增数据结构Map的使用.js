// 1.JavaScript中对象中是不能使用对象来作为key的
const obj1 = { name: "why" }
const obj2 = { name: "kobe" }

const info = {
  [obj1]: "aaa",
  [obj2]: "bbb"
}

console.log(info)//{ '[object Object]': 'bbb' }

// 2.Map就是允许我们对象类型来作为key的
// 构造方法的使用
const map = new Map()
map.set(obj1, "aaa")
map.set(obj2, "bbb")
map.set(1, "ccc")
console.log(map)
// Map(3) {
//   { name: 'why' } => 'aaa',
//   { name: 'kobe' } => 'bbb',
//   1 => 'ccc'
// }
const map2 = new Map([[obj1, "aaa"], [obj2, "bbb"], [2, "ddd"]])
console.log(map2)

// 3.常见的属性和方法
console.log(map2.size)

// set
map2.set("why", "eee")
console.log(map2)

// get(key)
console.log(map2.get("why"))

// has(key) true/false 
console.log(map2.has("why"))

// delete(key) true/false
map2.delete("why")
console.log(map2)

// clear
// map2.clear()
// console.log(map2) Map(0){}

// 4.遍历map
map2.forEach((item, key) => {
  console.log(item, key)
})

for (const item of map2) { //数组存放键值对， 0为键 ，1为值  [{name: 'key'}, 'aaa']
  console.log(item[0], item[1])
}

for (const [key, value] of map2) {
  console.log(key, value)
}

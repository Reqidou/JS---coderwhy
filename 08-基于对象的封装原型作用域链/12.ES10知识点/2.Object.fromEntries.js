const obj = {
  name: 'qidou',
  age: 23
}

//entries 对象转数组
const entries = Object.entries(obj)
console.log(entries); //[ [ 'name', 'qidou' ], [ 'age', 23 ] ]

// fromEntries 数组转对象
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries); //{ name: 'qidou', age: 23 }

// 数组转对象其他方法
const newObj = {}
for(let [name, age] of entries) {
  newObj[name] = age
}
  
entries.forEach((item, key) => {
  newObj[item[0]] = item[1] 
})
console.log(newObj);

//应用场景
const queryString = 'name=qidou&age=22'
const queryParams = new URLSearchParams(queryString)
console.log(queryParams);//URLSearchParams { 'name' => 'qidou', 'age' => '22' } 类似Map结构

for(const param of queryParams) {
  console.log(param);
  //[ 'name', 'qidou' ]
  // [ 'age', '22' ]
}

const paramObj = Object.fromEntries(queryParams)
console.log(paramObj);//{ name: 'qidou', age: '22' }
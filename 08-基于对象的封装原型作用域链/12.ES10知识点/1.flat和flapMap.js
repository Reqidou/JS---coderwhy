const nums = [1, 2, [3, 4], 5, [[6, 7], 8], 9]
// flat
const newNums = nums.flat(Infinity) //deep
console.log(newNums);

// flapMap
// 1. 先进行Map操作映射每个元素， 再做flat操作
// 2. flat操作相当于deep为1
const nums2 = [10, 20, 30]
const newNums2 = nums2.flatMap(item => {
  return item * 2
})

const newNums3 = nums2.map(item => {
  return item * 2
})

console.log(newNums2, newNums3);//[ 20, 40, 60 ] [ 20, 40, 60 ]

//实际应用场景
const message = ['Hello World', 'cool Guy', 'See U']
//使用循环遍历+扁平化方法
// let newMsgs = []
// const newMsg = message.forEach(item => {
//   item = item.split(' ')
//   newMsgs = [...newMsgs, item]
//   newMsgs = newMsgs.flat(Infinity)
//   return newMsgs
// })

// console.log(newMsgs); //[ 'Hello', 'World', 'cool', 'Guy', 'See', 'U' ]

//使用flatMap方法
//先映射Map，得到结果[ [ 'Hello', 'World' ], [ 'cool', 'Guy' ], [ 'See', 'U' ] ]
// 使用flat， 得到最终结果
const newMsg = message.flatMap(item => {
  return item.split(' ')
})
console.log(newMsg); //[ 'Hello', 'World', 'cool', 'Guy', 'See', 'U' ]
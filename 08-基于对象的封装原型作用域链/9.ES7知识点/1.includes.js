var names = ['1', '2', NaN]
//indexOf无法判断NaN类型
console.log(names.indexOf(NaN));//-1

//includes参数 查询元素 索引下标开始
console.log(names.includes('2', 1));//true
//可以判断NaN类型
console.log(names.includes(NaN))//true
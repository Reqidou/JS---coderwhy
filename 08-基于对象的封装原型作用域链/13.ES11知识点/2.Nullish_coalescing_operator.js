//空值合并运算符??

//以前的写法
const msg = 'receive the message' //'' null undefined三个情况需要额外判定
const result = msg || 'default value'

console.log(result);

//新的写法 ??
const newResult = msg ?? 'defaultvalue'

console.log(newResult);
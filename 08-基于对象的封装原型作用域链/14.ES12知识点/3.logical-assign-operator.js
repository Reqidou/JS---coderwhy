//||=逻辑或赋值运算
// let msg = '1'
// msg = msg || 'Default Value'

// msg ||= 'Default Value'

// console.log(msg);

//&&=逻辑与赋值运算

// &&
const obj = {
  name: 'qidou',
  foo: function() {
    console.log('foo函数被执行');
  }
}

obj && obj.foo()

//&&=
let info = {
  name: 'qidou'
}

info &&= info.name
console.log(info);//qidou

//3.??= 逻辑空判断 
//跟逻辑或差异在可以判断 [空字符串 || 0]

let msg = 0

msg ??= 'Default Value'

console.log(msg);
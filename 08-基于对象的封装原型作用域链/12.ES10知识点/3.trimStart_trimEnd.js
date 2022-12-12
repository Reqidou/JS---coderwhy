const msg = ' Hello '

console.log(msg.trim());//ES5
console.log(msg.trimStart().trimEnd());//ES10

// 其他新增方法
// Symbol description
const aaa = Symbol('aaa')
console.log(aaa);//Symbol(aaa)

// Option catch binding // 后面讲解try catch
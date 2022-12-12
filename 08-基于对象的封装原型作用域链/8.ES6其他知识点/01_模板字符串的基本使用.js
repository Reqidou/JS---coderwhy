// ES6之前拼接字符串和其他标识符
const name = "qidou"
const age = 22

// console.log("my name is " + name + ", age is " + age)

// ES6提供模板字符串 ``
const message = `my name is ${name}, age is ${age}`
console.log(message)


const info = `age double is ${age * 2}`
console.log(info)

//调用函数使用
function doubleAge() {
  return age * 2
}
const info2 = `double age is ${doubleAge()}`
console.log(info2)

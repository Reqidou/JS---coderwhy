// ES11前的最大安全整数
const maxInt = Number.MAX_SAFE_INTEGER
console.log(maxInt); //9007199254740991 53次方

// ES11
const bigInt = 90071992547409911n//添加n为大数字
console.log(bigInt);

// console.log(bigInt + 10);//Cannot mix BigInt and other types, use explicit conversions
//BigInt无法进行隐式转换， 需要将数字类型转换为大数字， 然后操作
console.log(bigInt + BigInt(10));



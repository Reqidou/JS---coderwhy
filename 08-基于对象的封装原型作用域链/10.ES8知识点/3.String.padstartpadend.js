let str = 'Hello World'
//填充后的字符长度， 填充符
var newStr = str.padStart(15, '-').padEnd(19, '-')
console.log(newStr);//----Hello World----

//案例
const card = '1231251252143214215124'
const cardLastFourNum = card.slice(-4)
let newCard = cardLastFourNum.padStart(card.length, '*')
console.log(newCard);//******************5124

newCard = card.replaceAll(/^(\d{18})(\d{4})/g, `******************$2`);
console.log(newCard);
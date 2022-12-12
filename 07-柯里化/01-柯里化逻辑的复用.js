// function log(date, type, msg) {
//   console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${msg}]`); 
// }
var log = date => type => msg => {
  console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${msg}]`); 
} 

let show = log(new Date())('show')
show('test')

let err = log(new Date())('err')
err('err')
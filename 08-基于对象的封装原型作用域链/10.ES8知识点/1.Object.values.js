var obj = {
  name: 'qidou',
  age: 22,
}

console.log(Object.keys(obj));//[ 'name', 'age' ]
console.log(Object.values(obj));//[ 'qidou', 22 ]

console.log(Object.values(['abc', 'cba', 'nba']));//[ 'abc', 'cba', 'nba' ]
console.log(Object.values('abc'));//[ 'a', 'b', 'c' ]
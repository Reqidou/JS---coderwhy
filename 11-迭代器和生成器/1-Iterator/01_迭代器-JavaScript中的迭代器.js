const names = ['abc', 'bca', 'cab']

let index = 0
const namesIterator = {
  next() {
    //done Boolean
    //value Val|Undefined
    if(index < names.length) {
      return {done: false, value: names[index++]}
    } else {
      return {done: true}
    }
  }
}

for(let i = 0; i < names.length + 1; i++) {
  console.log(namesIterator.next());
}

const nums = [100, 24, 23, 13, 42]

let indexNum = 0

const numsIterator = {
  next() {
    if(indexNum < nums.length) {
      return {done: false, value: nums[indexNum++]}
    } else {
      return {done: true, value: undefined}
    }
  }
}

for(let i = 0; i < nums.length + 1; i++) {
  console.log(numsIterator.next());
}
function createArrayIterator(arr) {
  let index = 0
  return {
    next() {
      if(index < arr.length) {
        return {done: false, value: arr[index++]}
      } else {
        return {done: true}
      }
    }
  }
}

const names = ['abc', 'bca', 'cab']
const namesIterator = createArrayIterator(names)
let index = 0
do {
  console.log(namesIterator.next());
  
} while (++index <= names.length);

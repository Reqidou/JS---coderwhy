const names = ['yjq', 'zf', 'zzq', 'zx']

function* createArrayIterator(arr) {
  for(let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

//2. 生成器函数 
function* createRangeGenerator(start, end) {
  // yield Math.floor(Math.random()*end + start)
  for(let i = start; i <= end; i++) {
    yield i
  }
}

const rangeGenerator = createRangeGenerator(1, 3)
console.log(rangeGenerator.next());
console.log(rangeGenerator.next());
console.log(rangeGenerator.next());
console.log(rangeGenerator.next());
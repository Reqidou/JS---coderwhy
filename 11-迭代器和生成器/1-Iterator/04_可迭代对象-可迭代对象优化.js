const infos = {
  name: 'qidou',
  age: 23,

  [Symbol.iterator]() {
    const keys = Object.keys(this)
    const values = Object.values(this)
    const entries = Object.entries(this)
    let index = 0
    const Iterator = {
      next() {
        if(index < entries.length) {
          return { done: false, value: entries[index++]}
        } else {
          return { done: true }
        }
      }
    }
    return Iterator
  }
}

for(let item of infos) {
  let [key, value] = item
  console.log(key, value);
}
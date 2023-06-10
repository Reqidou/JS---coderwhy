class Person {
  constructor(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
  }
  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if(index < this.friends.length) {
          return { done: false, value: this.friends[index++]}
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

const zx = new Person('zx', 23, ['yjq', 'zf', 'zzq'])
for(let item of zx) {
  console.log(item);
}
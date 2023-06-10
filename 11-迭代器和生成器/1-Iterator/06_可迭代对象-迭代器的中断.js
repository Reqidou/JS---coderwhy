class Person {
  constructor(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
  }
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      },
      return: () => {
        console.log('监听到迭代器中断了')
        return { done: true }
      },
    }
  }
}
const zx = new Person('zx', 23, ['yjq', 'zf', 'zzq'])

for (let item of zx) {
  console.log(item)
  if (item === 'zzq') {
    break
  }
}

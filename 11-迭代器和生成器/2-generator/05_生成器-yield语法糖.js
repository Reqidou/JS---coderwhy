class Person {
  constructor(name, age, score) {
    this.name = name
    this.age = age
    this.score = score
  }
  *[Symbol.iterator]() {
    yield* this.score
  }
}

const zx = new Person('zx', 23, [100, 20, 30, 21])

for(let item of zx) {
  console.log(item);
}
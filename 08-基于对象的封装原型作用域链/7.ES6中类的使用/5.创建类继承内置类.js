class findIndex extends Array {
  firstIndex() {
    return this[0]
  }

  lastIndex() {
    return this[this.length - 1]
  }
}

var arr = new findIndex(1, 2, 3)

console.log(arr.firstIndex())
console.log(arr.lastIndex())

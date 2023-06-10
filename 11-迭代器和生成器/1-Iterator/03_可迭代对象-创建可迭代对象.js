const infos = {
  datas: [123, 451, 241],
  [Symbol.iterator]() {
    let index = 0
    const infosIterator = {
      next: () => {
        if(index < this.datas.length) { 
          return {done: false, value: this.datas[index++]}
        } else {
          return {done: true}
        }
      }
    }

    return infosIterator
  }
}

const Iterator = infos[Symbol.iterator]()
console.log(Iterator.next());
console.log(Iterator.next());
console.log(Iterator.next());
console.log(Iterator.next());

//可迭代对象可进行for...of...操作
for(const item of infos) {
  console.log(item);
}

//可迭代对象必然有一个[Symbol.iterator]函数
//数组也是一个可迭代对象

const students = ['可迭代对象', '数组', '函数']
const studentsIterator = students[Symbol.iterator]()
console.log(studentsIterator.next());
console.log(studentsIterator.next());
console.log(studentsIterator.next());
console.log(studentsIterator.next());
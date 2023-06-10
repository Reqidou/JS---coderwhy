function requestData(res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 3000)
  })
}

function* getData() {
  const res1 = yield requestData('res1')
  console.log('res1:', res1);
  const res2 = yield requestData(res1 + 'Hi')
  console.log('res2:', res2);
  const res3 = yield requestData(res2 + 'Bye')
  console.log('res3:', res3);
}

// const generator = getData()

// //多次调用麻烦一些， 为了避免这个问题， 使用生成器函数
// generator.next().value.then(res1 => {
//   generator.next(res1).value.then(res2 => {
//     generator.next(res2).value.then(res3 => {
//       generator.next(res3)
//     })
//   })
// })

//自动化执行生成器函数
function execGenFn(genFn) {
  //生成器函数
  const generator = genFn()

  function exec(res) {
    const result = generator.next(res)
    if(result.done) return
    result.value.then(res => {
      exec(res)
    })
  }

  exec()
}

execGenFn(getData)
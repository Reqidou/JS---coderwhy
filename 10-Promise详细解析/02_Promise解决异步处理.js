function execCode(counter) {
  const promise = new Promise((resolve, reject) => {
    //异步任务
    setTimeout(() => {
      if(counter > 0) {
        let total = 0
        for(let i = 0; i < counter; i++) {
          total += i
        }
        //成功的回调
        resolve(total)
      } else {
        reject(`输入的数值:${counter} 小于0，请重新输入`)
      }
    }, 3000);
  })

  return promise 
}

const promise = execCode(100)
promise.then(res => {
  console.log(`the result is ${res}`);
})
promise.catch(err => {
  console.log(err);
})

// const promise2 = execCode(0) 
// promise2.then(res => {
//   console.log(`the result is ${res}`);
// })
// promise2.catch(err => {
//   console.log(err);
// })

//简写形式
execCode(255).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
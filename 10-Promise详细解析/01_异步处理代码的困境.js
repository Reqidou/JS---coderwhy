//默认写法
// function execCode(callback) {
//   console.log('Runing');
//   setTimeout(() => {
//     let total = 0
//     for(let i = 0; i <= 100; i++) {
//       total += i
//     }
//     callback(total)
//   }, 3000);
// }

// execCode((value) => {
//   console.log('Success!', value);
// })

//返回请求回调参数
// function execCode(counter, successCallback, failureCallback) {
//   return counter > 0 ? successCallback() : failureCallback()

// }

// execCode(0, () => {
//   console.log('Success');
// }, () => {
//   console.log('Failure');
// })

//视频代码
function execCode(counter, successCallback, failureCallback) {
  setTimeout(() => {
    if (counter <= 0) {
      failureCallback('计数小于0， 返回失败')
    } else {
      let result = 0
      for (let i = 0; i <= counter; i++) {
        result += i
      }
      successCallback(result)
    }
  }, 3000)
}

execCode(
  100,
  (value) => {
    console.log('Get Success and the result is:', value)
  },
  (err) => {
    console.log(err)
  }
)

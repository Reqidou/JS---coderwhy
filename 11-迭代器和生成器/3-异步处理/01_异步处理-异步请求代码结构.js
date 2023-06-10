function requestData(res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 3000);
  })
}



//1.发送一次网络请求
// requestData('http://www.123.com').then(res => {
//   console.log(res);
// })

//方式一： 层层嵌套 回调地狱(callback hell)
//#region 
function getData1() {
  requestData('why').then(res1 => {
    console.log(`第一次的结果是：${res1}`);
    requestData(res1 + 'test1').then(res2 => {
      console.log(`第二次的结果是：${res2}`);
      requestData(res2 + 'test2').then(res3 => {
        console.log(`第三次的结果是：${res3}`);
      })
    })
  })
}
// getData1()
//#endregion

//方式二： Promise进行重构（解决回调地狱）
//#region 
function getData2() {
  requestData('why').then(res1 => {
    console.log('第一次的结果：', res1);
    return requestData(res1 + 'test')
  }).then(res2 => {
    console.log('第二次的结果：', res2);
    return requestData(res2 + 'Final')
  }).then(res3 => {
    console.log('第三次的结果是：', res3);
  })
}
// getData2()
//#endregion

//方式三： 最终代码 使用yield语法糖
//#region 
// function* getData3() {
//   const res1 = yield requestData('why')
//   console.log('第一次的执行结果为：', res1);
//   const res2 = yield requestData(res1 + 'Hi')
//   console.log('第二次的执行结果为：', res2);
//   const res3 = yield requestData(res2 + 'Jams')
//   console.log('第三次的执行结果为：', res3);
// }

// const generator = getData3()

// generator.next().value.then(res1 => {
  //   generator.next(res1).value.then(res2 => {
    //     generator.next(res2).value.then(res3 => {
      //       generator.next(res3).value
      //     })
      //   })
      // });
      //#endregion
      
// 方法四： 引出async/await的方法
async function getData4() {
  const res1 = await requestData('why')
  console.log('res1:', res1);
  const res2 = await requestData(res1 + 'Hi')
  console.log('res2:', res2);
  const res3 = await requestData(res2 + 'Bye')
  console.log('res3:', res3);
}

const generator1 = getData4()

// generator1.next().value.then(res1 => {
//   generator1.next(res1).value.then(res2 => {
//     generator1.next(res2).value.then(res3 => {
//       generator1.next(res3)
//     })
//   })
// })
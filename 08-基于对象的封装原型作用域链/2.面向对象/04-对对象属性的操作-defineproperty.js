var obj = {
  name: 'qidou',
  hobby: function() {
    console.log('HiHi');
  }
}

//Object.defineProperty
//修改
Object.defineProperty(obj, 'name', {
  value: 'zahoxuan'
})
//添加 由于添加的属性为不可枚举，所以需要添加内部属性
Object.defineProperty(obj, 'hate', {
  enumerable: true,
  value: '疫情封城',
})
console.log(obj);
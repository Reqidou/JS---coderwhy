var obj = {
  age: 21,
}
//禁止对象继续添加新属性
Object.preventExtensions(obj)
obj.name = 'qidou'
console.log(obj);

//禁止对象配置/删除里面的属性[configurable]
Object.seal(obj) // 所有configurable为false
delete obj.age
console.log(obj.age);

//禁止对象修改[writable]
Object.freeze(obj)
obj.age = 22
console.log(obj.age);

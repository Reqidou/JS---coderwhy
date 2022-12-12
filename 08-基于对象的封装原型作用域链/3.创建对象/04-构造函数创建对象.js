// 构造函数首字母大写
function Foo(name, hobby) {
  this.name = name
  this.hobby = function() {
    console.log(`${this.name} love ${hobby}`);
  }
}

var zx = new Foo('qidou', 'coding')
//跟工厂函数相比，有了新的类型： Foo
//弊端： 每一次创建，都会创建一个新的函数内部方法hobby，浪费资源。所以使用原型 
console.log(zx);

console.log(zx.__proto__ === Foo.prototype); //true
console.log(zx.__proto__.constructor === Foo); //true
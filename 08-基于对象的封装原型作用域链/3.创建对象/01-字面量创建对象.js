// 1.new Object
// var obj = new Object()
// obj.name = 'qidou'
// obj.hobby = function() {
//   console.log(`${this.name} love typing`);
// }

// obj.hobby()

// 2.字面量创建
var obj = {
  name: 'qidou',
  hobby: function() {
    console.log(`${this.name} love typing`);
  }
}

obj.hobby()

// 可选链条 ?.

const obj = {
  name: 'qidou',
  friends: {
    name: 'lilei',
    girlFriend: {
      name: 'zhangdapao'
    }
  }
}
//之前的写法
if(obj && obj.friends && obj.friends.girlFriend) {
  console.log(obj.friends.girlFriend.name);
}

//?.
console.log(obj?.friends?.girlFriend?.name)


class Student {
  // 1.实例属性
  height = 1.70
  //ES13新增属性 #name
  #priva = 'private私有属性， 没办法直接被访问。获取会报错'
  // 2. 类属性
  static classPro = '类属性，public 可以通过 【Man|Student.classPro】 访问'
  static #classProp = '类属性： private 无法访问'

  constructor(name, age, address = '山西') {
    this.name = name
    this.age = age
  }

  // 3.静态代码块
  static {
    console.log('首次加载代码块的时候， 会执行一次静态代码块。 相关初始化可以在此进行');
  }
}

class Man extends Student {
  constructor(sex = 'Man') {
    super('qidou', 18)
    this.sex = sex

  }
}

const qidou = new Man()
console.log(Man.classPro);

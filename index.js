class People{
  type = 'ssss'
  constructor(name) {
    this.name = name
  }
  sayName(){
    console.log(this.name,'type:',this.type)
  }
}

class Man extends People{
  constructor(name, age) {
    super(name);
    this.age = age
  }
  saySex(){
    console.log('我是男人')
  }
  sayAge(){
    console.log(this.age, this.type)
  }
}

let xiaoming = new Man('xiaoming', 23)
xiaoming.sayName()
xiaoming.saySex()
xiaoming.sayAge()
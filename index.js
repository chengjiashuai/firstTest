class People{
  type = 'ssss'
  name = 'ssssssss'
  constructor(name) {
    // this.name = name
  }
  sayName(){
    console.log('test')
    console.log(this.name,'type:',this.type)
  }
}

class Man extends People{
  all = 'all'
  constructor(name, age) {
    super();
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
xiaoming.type = 'kkkk'
xiaoming.all = 'sss'
xiaoming.name = 'sdfsdfs'
console.log(xiaoming,'xiaoming');
let lili = new Man('lili', 24)
console.log(lili,'ssss');

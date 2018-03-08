abstract class Animal {
  abstract run()
}

class Dog extends Animal {
  run() {
    console.log('Dog is running')
  }
  say() {
    console.log('dog dog')
  }
}

class Cat extends Animal {
  run() {
    console.log('Cat is running')
  }
  say() {
    console.log('cat cat')
  }
}


let obj1: Animal = new Dog()

let obj2: Animal = new Cat()

obj1.run()

obj2.run()
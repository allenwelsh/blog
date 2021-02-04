# React高阶组件

在开始聊高阶组件之前我们先来看下高阶函数和高阶组件在形式上的差异：





**一、什么是装饰器模式：**

>要想正确理解设计模式，首先必须明确它是为了解决什么问题而提出来的。

那装饰器模式到底是为了解决什么问题呢？在我们的开发过程中我们会为了一些通用功能在多个不同的组件、接口或者类中使用，这个时候我们这些功能写到每个组件、接口或者类中，但是这样非常不利于维护。

装饰器就是为了解决在不修改原本组件、接口或者类的时候为其添加额外的功能。

从本质上看装饰器模式是一个包装模式（(Wrapper Pattern），它是通过封装其他对象达到设计的目的的。

react的高阶组件本质也是装饰器模式，以后会有一篇文章会专门详解react的高阶组件。


理解了装饰器的能解决了什么问题，那我们一遍在什么情况下考虑使用装饰器模式呢？我的理解是：
* 需要扩展一个类，为这个类附加一个方法或者属性的时候；
* 需要修改一个类的功能，或者重构这个类中的某个方法；


**二、装饰器的基本概念：**

上面我们解释了什么是装饰器模式，下面我们将要ES7的装饰器的一些基本概念：如何定义装饰器、装饰器执行时机、装饰器类型。

1、如何定义装饰器

装饰器本质是一个函数，可以分为带参数和不带参数（也叫装饰器工厂），装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

```
@Test()
class Hello {}

function Test(target:any) {
    console.log("I am decorator.")
}
```

2、装饰器执行时机

修饰器对类的行为的改变，是代码编译时发生的（不是TypeScript编译，而是js在执行机中编译阶段），而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数

3、装饰器的类型

类装饰器、属性装饰器、方法装饰器、参数装饰器


**三、装饰器类型：**

* 类修饰器

类装饰器一般主要应用于类构造函数，可以监视、修改、替换类的定义，装饰器用来装饰类的时候。装饰器函数的第一个参数，就是所要装饰的目标类本身。

a、添加静态属性或方法

```
@Test()
class Hello {}

function Test(target) {
   target.a = 1;
}

let o = new Hello();

console.log(o.a) ==>1
```


b、添加实例属性或方法

```
@Test()
class Hello {}

function Test(target) {
   target.prototype.a = 1;
   target.prototype.f = function(){
       console.log("新增加方法")
   };

}

let o = new Hello();
o.f() ==>"新增加方法"
console.log(o.a) ==>1
```

c、装饰器工厂（函数柯里化）

很多文章说装饰器工厂是闭包，其实不准确，关于高阶函数、闭包、函数柯里化可以参考：
[理解运用JS的闭包、高阶函数、柯里化](https://blog.csdn.net/qq_42564846/article/details/81448352)


```
@Test('hello')
class Hello {}

function Test(str) {
   return function(){
        target.prototype.a = str;
        target.prototype.f = function(){
            console.log(str)
        };
   }

}

let o = new Hello();
o.f() ==>"hello"
console.log(o.a) ==>"hello"
```

d、重载构造函数

```
@Test('hello')
class Hello {
    constructor(){
        this.a= 1
    }
    f(){
         console.log('我是原始方法',this.a)
    }

}

function Test(target) {
  return class extends target{
      f(){
         console.log('我是装饰器方法',this.a)
    }
  }

}

let o = new Hello();
o.f() ==>"我是装饰器方法",1
```

* 方法装饰器

它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
方法装饰会在运行时传入下列3个参数：

1. target：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. key： 成员的名字。
3. descriptor：成员的属性描述符。

```
descriptor：
// {
//   value: specifiedFunction,
//   enumerable: false,
//   configurable: true,
//   writable: true
// };

```
>方法装饰器最后必须返回descriptor



 



```
function nameDecorator(target, key, descriptor) {
    descriptor.value = () => {
        return 'jake';
    }
    return descriptor;
}

class Person {
    constructor() {
        this.name = 'jake'
    }
    @nameDecorator
    getName() {
        return this.name;
    }
}

let p1 = new Person();
console.log(p1.getName())



另外一个经典例子

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function(...list) {
    console.log(list);
    console.log(`Calling ${name} with`, ...list);
    return oldValue.call(this, ...list);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
let result = math.add(2, 4);

console.log(result)
```


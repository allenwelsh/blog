#### Q1:说一下数据类型转换

A:
1、转 boolean 型，目前除了以下 5 个类型以外所有的都是 true

```
null
undefined
0
NaN
''
```

2、转 string，js 对象原型中 里面除了 null，undefined 以外都会有自己的 toSting 方法

```
Number.prototype.hasOwnProperty('toString');    //输出true
Number.prototype.hasOwnProperty('valueOf');    //输出true
String.prototype.hasOwnProperty('toString');    //输出true
String.prototype.hasOwnProperty('valueOf');    //输出true
Boolean.prototype.hasOwnProperty('toString');    //输出true
Boolean.prototype.hasOwnProperty('valueOf');    //输出true
Array.prototype.hasOwnProperty('toString');     //输出true
Array.prototype.hasOwnProperty('valueOf');     //输出false
Function.prototype.hasOwnProperty('toString');     //输出true
Function.prototype.hasOwnProperty('valueOf');     //输出false
Object.prototype.hasOwnProperty('toString');     //输出true
Object.prototype.hasOwnProperty('valueOf');     //输出true
Date.prototype.hasOwnProperty('toString');     //输出true
Date.prototype.hasOwnProperty('valueOf');     //输出true
RegExp.prototype.hasOwnProperty('toString');     //输出true
RegExp.prototype.hasOwnProperty('valueOf');     //输出false
说明：hasOwnProperty用于查看某个对象本身是否具有某属性，只在对象本身查找不在该对象的原型链上查找
```

转换的方法是：

```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
'5'+[1,2] //51,2

```

需要注意 Object.prototype.toString 方法

```
Object.prototype.toString.call(1);   //"[object Number]"
Object.prototype.toString.call('2');    //"[object String]"
Object.prototype.toString.call(true);    //"[object Boolean]"
Object.prototype.toString.call([]);      //"[object Array]"
Object.prototype.toString.call(function(){});    //"[object Function]"
Object.prototype.toString.call(new Date());      //"[object Date]"
Object.prototype.toString.call(/^hello world$/);  //"[object RegExp]"

说明：Object,Number,String,Boolean,Array,Function,Date本身都是构造函数，他们的方法都是要继承给他的实例使用的，使用方法都是绑定在原型prototype上
```

3、转 number，除了以下以为其他的转换都为 NaN

```
Number(123) // 123
Number('123') // 123
Number('') // 0
Number(true) // 1
Number(false) // 0
Number(null) // 0
Number(undefined) // NaN 尤其注意
```

4、对于对象转换成字符串或者数值时有一个基本原则：

```
Number(对象)
调用对象的valueOf方法，若返回原始类型的值，则遵照上面的"非对象强制转换规则",若还是返
回对象，则调用toString方法，若返回原始类型的值，则遵照上面的"非对象强制转换规则",
若返回对象则报错
String(对象)
调用对象的toString方法，若返回原始类型的值，则遵照上面的"非对象强制转换规则",若还是返
回对象，则调用valueOf方法，若返回原始类型的值，则遵照上面的"非对象强制转换规则",
若返回对象则报错
```

#### Q2、说一下对原型链的理解

- prototype 与*proto*区别
- 函数对象的 prototype 包含哪些内容

A：
1、js 里面，一切皆是对象，除了 Object.prototype 外任何一个对象都有*proto*,*proto*是一个指针，这个指针是指向构造这个对象的 prototype；
2、只有函数对象拥有 prototype，prototype 默认包含 constuctor 和其他属性方法，同时 prototype 也是一个对象，那它同时也包含*proto*

```
Object.prototype._proto_ === null

Function.prototype._proto_ === Object.prototype //true

Object._proto_ === Function.prototype //true

```

#### Q3、手写一个 apply 函数

A：
1、思路：apply 是原本是 Function.prototype 上面的一个方法，这样所有函数都能使用 fn.apply(obj,[agr])

```
Function.prototype.myApply = function(obj,[agr]){
    obj.fn = this;//获取到方法实体
    var r = obj.fn([agr]);//const otherArg = Array.from(arguments).slice(1);//执行函数
    delete obj.fn;//删除方法
    return r;//返回结果
}

```

2、arguments 是一个对应于传递给函数的参数的类数组对象，arguments 对象不是一个 Array，它类似于 Array，但除了 length 属性和索引元素之外没有任何 Array 属性

```
转数组
// ES5
var arg1 = Array.prototype.slice.call(arguments);
var arg2 = [].slice.call(arguments);

// ES6
var arg3 = Array.from(arguments);
var arg4 = [...arguments];

```

#### Q4、说一下浏览器的异步处理机制

A:
1、首先浏览器是多线程的，但是 js 引擎是单线程的，多线程的话需要处理资源同步的问题，浏览器不适合做多进程同步，虽然 JavaScript 是单线程的，可是浏览器内部不是单线程的。一些 I/O 操作、定时器的计时和事件监听（click, keydown...）等都是由浏览器提供的其他线程来完成的
2、单线程存在的问题，有一些费时的任务（资源请求、事件），不可能一直等待，所以需要异步事件处理队列；
3、浏览器是通过事件循环的方式处理任务消息队列；
4、任务分为宏任务和微任务，宏任务包含 ajax，timeout，事件处理等，微任务主要是 promise、process.nextTick；
5、浏览器先执行一个宏任务里面的同步代码，当碰到异步任务时，异步任务交给相应异步线程，同时继续执行同步代码，异步线程执行执行完后，会把异步回调写入相应消息队列；
6、只有当一个宏任务里面的同步代码执行完以后，会去检查微任务是否有可执行的任务，微任务执行完成后，继续去执行一个可执行宏任务。
7、手写一个 promise 方法

```

思路：

let a = new myPromise((resolve,reject)=>{
    console.log(111);
    resolve(1);
})

a.then((res=>{
    console.log(res)
})



class myPromise{

    constructor(exector){
        this.status = "PENDDING";
        this.value = null;
        this.error = null;
        this.onResolvedCallbacks = [];
        this.onRejectCallbacks = [];
        exector(this.resolve,this.reject)
    }
    resolve(value){
        this.value = value;
        this.onResolvedCallbacks.map(fn=>{
            fn(value)
        })//针对异步处理
        this.status ="DONE";
    }
    reject(error){
        this.status ="FAILED";
        this.onResolvedCallbacks.map(fn=>{
            fn(value)
        })
        this.error = error;
    }
    then(scb,ecb){
        let status = this.status;
        if(status==='PENDDING){
            this.onResolvedCallbacks.push(scb)//针对异步处理
            this.onRejectCallbacks.push(ecb)//针对异步处理
        }else if(status==='DONE'){
            scb(this.value)//同步时执行
        }else if(status==='FAILED'){
            ecb(this.error)//同步时执行
        }
    }

}


```

8,async 和 await 原理

- async 函数返回的是一个 promise 对象
- await 其实是一个自执行函数的封装，底层实现的是 generator 和 yield 自执行，类似如 co.js

#### Q5、常用的继承方式有哪些

A

- es5,es6,ts 中 class 差别

```
//es5
function Father(name){
    this.name = name;
}
Father.prototype.showName = function(){
    console.log(this.name)
}

//es6

class Father{
    constructor(name){
        this.name = name;
    }
    showName(){//类的所有方法都定义在类的prototype属性上面
        console.log(this.name)
    }
}


//ts

class Father{
    name:string;
    constructor(name:string){
        this.name = name;
    }
    showName(){//类的所有方法都定义在类的prototype属性上面
        console.log(this.name)
    }
}


```

- 组合继承

```
function Son (name,color){
    Father.call(this,name)//相当于super,实现属性继承
    this.color = color;
}//实现属性继承
Son.prototype = new Father();//实现原型链继承
Son.prototype.constructor = Son;


//缺点是执行了2次Father

```

- 完美继承 （组合寄生）

```


function Son (name,color){
    Father.call(this,name)//相当于super,实现属性继承
    this.color = color;
}
function inheritPrototype(Son, Father){
    let myPrototype = Object.create(Father.prototype);//获取属性和继承
    Son.prototype = myPrototype;
    Son.prototype.constructor = Son;
}
inheritPrototype(Son, Father)

```

- super 功能

  - extends 实现继承，如果想继承父类的属性，必须使用 super 方法；
  - 子类同名方法会覆盖父类同名方法，使用 super 关键字后则可以调用到父类的同名函数

- Object.create 实现

理解：

```
let newObj = Object.create(proto,propertiesObject)
```

> proto:新创建对象的原型对象
> propertiesObject:可选。要添加到新对象的可枚举（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性。

```

      function myCreate(proto,propertiesObject){
            function B  = {};
            B.prototype = proto;
            let b = new B();
            Object.assign(b,propertiesObject)
            return b
      }

```

- new 实现

let s = new Son("red");

```
  function myNew (){
    let obj = {};
    let con = arguments[0];//获取构造函数
    obj._proto_ = con.prototype;
    let resetArguments = [].slice.call(arguments,1);
    let result = con.apply(obj,resetArguments);
    return typeof result === "object" ? result : obj
  }

```

#### Q6、常用的设计模式有哪些

A:
1、常用的设计模式有订阅者、发布者模式、单例模式、代理模式、

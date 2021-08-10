# JS 面试总结

[牛客网](https://www.nowcoder.com/intelligentTest)

[20210129]https://www.nowcoder.com/test/question/done?tid=40806477

1、以下代码执行后，5 秒后内控制台输出的信息是？

```
for(var i = 0; i < 5; i++){
setTimeout(function(){
console.log(i);
}, 1000 \* i);
}
```

答案：55555，不是 44444

for(表达式 1;表达式 2;表达式 3){
　　表达式 4;
}

执行顺序：

1）第一次循环，即初始化循环。

首先执行表达式 1（一般为初始化语句），再执行表达式 2（一般为条件判断语句），判断表达式 1 是否符合表达式 2 的条件，如果符合，则执行表达式 4，否则，停止执行，最后执行表达式 3.

2）换个姿势再来一次：

首先执行表达式 2，判断表达式 3 是否符合表达式 2 的条件；如果符合，继续执行表达式 4，否则停止执行，最后执行表达式 3.如此往复，直到表达式 3 不再满足表达式 2 的条件。

总结：

执行顺序是一致的，先进行条件判断（表达式 2），再执行函数体（表达式 4），最后执行表达式 3。

---

2、在浏览器控制台执行以下代码，输入的结果是（）

```
function test(){
    var n = 4399;

    function add(){
        n = n+1;
        console.log(n)
    }
    return {n:n,add:add}
}
var result = test();
var result2 = test();
result.add();
result.add();
console.log(result.n)
result2.add()

```

答案：4400 4401 4399 4400

本题知识点：
test 构成了一个闭包，result 跟 result2 各自有自己的 test 作用域，所以最后 result2.add()结果是 4400
懵逼点在第三个，这里{n：n}是对变量 n 里的值进行缓存，而不是本身 n 这个指针变量，这样生成 add 的时候 n 指向的值是多少{n：n}里的值就是多少

---

3、以下哪些操作会触发 Reflow：()

A、alert(obj.className)

B、alert(obj.offsetHeight)

C、obj.style.height = “100px”

D、obj.style.color = “red”

答案：B、C

使用 offsetWidth 和 offsetHeight：这一点很特别，你读一个 DOM 的 offsetWidth 和 offsetHeight 属性同样会触发一下 Reflow，因为这两个属性需要依赖一些元素去计算

---

[20210127](https://www.nowcoder.com/test/question/done?tid=40759370&qid=55071)

1、js 数组的方法中，哪些方法不能改变自身数组？

A、pop；

B、splice；

C、sort；

D、concat；//

答案：D

本题知识点：
concat 用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本;

---

2、以下代码执行后，console 的输出是？

```

function Foo(){'use strict'
console.log(this.location);
}
Foo()

```

A、当前窗口的 Location 对象；

B、undefined；

C、null；

D、TypeError；//

答案：D

本题知识点：
严格模式下禁止 this 关键字指向全局对象。
此时 this 为 undefined。

---

3、下列说法正确的是()

A、每个 JS 对象一定对应一个原型对象，并从原型对象继承属性和方法了；

B、对象的**proto**指向自己构造函数的 prototype；

C、Object.prototype. **proto**=== null，说明原型链到 Object.prototype 终止；

D、表达式 Function.prototype.**proto**.**proto** === null 的运行结果为 true。

答案：ABCD

本题知识点：
1、一切皆为对象，但是对象也是有区别的，分为普通对象和函数对象，只有函数对象有 prototype；
2、constructor 是一个指针，每个对象都有一个 constructor,指向就是对象的构造函数：

```

function Foo(){};
var foo = new Foo();
alert(foo.constructor);//Foo
alert(Foo.constructor);//Function
alert(Object.constructor);//Function
alert(Function.constructor);//Function

```

3、函数对象的 prototype 一定包含一个 constructor 属性，这个 constructor 指向函数对象本身，在默认情况下，所有的原型对象都会自动获得一个 constructor（构造函数）属性，这个属性（是一个指针）指向 prototype 属性所在的函数;

```

function Person(){}
var p = new Person();
alert(p.constructor);//Person
alert(Person.prototype.constructor);//Person
alert(Person.prototype.hasOwnProperty('constructor'));//true
alert(Person.prototype.isPrototypeOf(p));//true
alert(Object.prototype.isPrototypeOf(p));//true

```

4、任何对象（普通对象和函数对象）在创建的时候都会有一个内置的**proto**属性，用于指向创建它的构造函数的原型对象

---

[20210219](https://www.nowcoder.com/test/question/done?tid=41085494&qid=44725#summary)

1、

```

(function() {
var a = b = 5;
})();
console.log(b);
console.log(a);
```

答案：5，Uncaught ReferenceError: a is not defined

知识点： var a = b = 5 等价于 var a = 5; b = 5;
另外任何没有声明的变量使用都会报错

---

[20210222](https://www.nowcoder.com/test/question/done?tid=41160905&qid=22170#summary)

1、

```

var x = new Boolean(false);
if (x) {
  alert('hi');
}
var y = Boolean(0);
if (y) {
  alert('hello');
}

;
```

答案：Hi

知识点： 1、if(x) 这里期望 x 是一个布尔类型的原始值，而 x 是一个对象，任何对象转为布尔值，都为得到 true（切记！在 JS 中，只有 0，-0，NaN，""，null，undefined 这六个值转布尔值时，结果为 false）；

2、一定要注意 y = Boolean(0)，而不是 y = new Boolean(0)。这两个有很大区别，用 new 调用构造函数会新建一个布尔对象，此处没有加 new，进行的是显示类型转换

---

- 以下结果里，返回 `false` 的是？

```
A、[] == true

B、!![]

C、NaN == NaN


D、null == undefined
```

答案：A 和 C

知识点：A 中，两边都进行了隐式转换。true 会转为 1 ,[ ] 会转为 0 ，最后是比较的是 0 == 1，所以结果是 false。
注意：[]转换成字符串为“”

[]转换成 boolean 为 true；

[]转换成数字为 0；

这样 B 中的[]即隐式转换为 true

---

以下代码执行后，控制台的输出是：

```
var a = 10;
function a(){}
console.log(typeof a)
```

答案：number

知识点：

```
var a;
function a(){};
typeof a; //function
a= 10;
typeof a; //number
console.log(typeof a)
```

---

- 手写一个 apply 函数

思路：
1、获取到需要处理的函数
2、将目标函数绑定到目标对象上；
3、获取参数
4、执行该目标对象的函数；
5、释放删除该函数 ；

```
方法1:

Function.prototype.myApply = function (context) {
  context.fn = this; //1.将函数挂载到传入的对象
  console.log(111, this);
  var arg = [...arguments].splice(1); //2.取参数
  context.fn(...arg); //3.执行对象的方法
  delete context.fn; //4.移除对象的方法
};

```

```
方法2:

function myApply(fn, obj) {
  obj.fn = fn;
  var arg = [...arguments].splice(2);
  var result = obj.fn(...arg);
  delete obj.fn;
  return result;
}

```

---

- 手写一个 call 函数

  基本思路与 apply 一样，差异在于 call 获取参数的时候，var arg = [...arguments].splice(1)[0],且 arg 本身必须是数组

---

- 手写一个继承

```
function Father() {
  this.f = 1;
}
Father.prototype.show = function () {
  console.log(this.f);
  console.log(this.s);
};

```

方法一：Son 的 prototype 指向 Father.prototype，同时将 Son.prototype.constructor 指向 Son。

```
Son.prototype = Father.prototype;
Son.prototype.constructor = Son;


此时Son无法继承Father的属性

```

方法二：Son 的 prototype 指向 new Fathe(), Son.prototype.constructor 指向 Son。

```
Son.prototype = new Father();//Son.prototype.__proto__ = Father.prototype
Son.prototype.constructor = Son;

```

对象继承
方法三：

```
var father = {
  a:1,
  b:2,
  show:function(){
    console.log(this.a)
  }
}

Son.prototype = father;
Son.prototype.constructor = Son;

```

---

- 手写一个 new

思路：1、对照工厂模式和构造函数，首先需要创建一个对象，其实需要返回这个对象；
2、需要继承构建函数的 prototype
3、改变 this 指向，同时绑定属性
4、返回对象

```
- 工厂模式

function f (a,b){
   var obj = {};
    obj.a = a;
    obj.b = b;
    obj.show = funcion(){
      console.log(obj.a)
    }
    return obj;
}

- 构造函数

function C (a,b){
   this.a = a;
   this.b = b;
   this.show = funcion(){
      console.log(this.a)
    }

}

C.prototype.s= 2;


- new

function myNew(obj,...ret){

  var newObj = Object.create(obj.prototype);
  var result = obj.apply(newObj, rest);
  return typeof result === 'object' ? result : newObj;

}


function myNew () {
  //创建一个新对象
  let obj  = {};
  //获得构造函数
  let Con = [].shift.call(arguments);
  //链接到原型（给obj这个新生对象的原型指向它的构造函数的原型）
  obj.__proto__ = Con.prototype;
  //绑定this
  let result = Con.apply(obj,arguments);
  //确保new出来的是一个对象，因为Con执行的结果会返回当前实例
  return typeof result === "object" ? result : obj
}

```

---

- 手写一个 create 实现

  Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。

思路：
1、需要首先创建一个空对象
2、这个空对象的**proto**指向现有的对象
3、返回对象

```
 function create (proto){
    function F() {}
    F.prototype = proto;
    return new F();
 }

 或者
 function create (obj) {
    var B={};
    B.__proto__=obj;
    return B;
};

```

---

- 手写一个 extends 实现

1、ES6 的类主要是通过 constructor 来实现构造函数的，如果不用 constructor 写成 class B{name = 'wxp'}也是可以的,但是这样就没法传参，所以可以理解为 constructor 的作用主要是用来供实例对象传参的。

2.以上 A 类在实现 B 类的函数体内除了 constructor 还有个 super 的调用，这个 super 的调用主要用来执行 B 类，也就是父类的构造函数。因为 A 类继承 B 类，所以必将会用到 B 类的属性或方法，如果 B 类也需要传参，那么 super 就提供了一个传参入口

```
function B(name){
  this.name = name;
};
function A(name,age){
  //1.将A的原型指向B
  _extends(A,B);
  //2.用A的实例作为this调用B,得到继承B之后的实例，这一步相当于调用super
  getPrototypeOf(A).call(this, name)
  //3.将A原有的属性添加到新实例上
  this.age = age;
  //4.返回新实例对象
  return this;
};
function _extends(A,B){
   A.prototype.__proto__= B.prototype;
   A.prototype.constructor = A;
   Object.setPrototypeOf(A,B);
};
var a = new A('wxp',18);
console.log(a);{name:'wxp',age:18}
```

- 手写一个 super 实现
<!-- https://segmentfault.com/a/1190000015565616 -->

---

- 手写一个 promise

```
class PromiseA {
  constructor(exector) {
    // super();
    this.state = "PENDING";
    this.value = undefined;
    this.reson = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      this.value = value;
      if (this.state === "PENDING") {
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
      this.state = "DONE";
    };
    const reject = (reason) => {
      this.state = "FAIL";
      this.reson = reason;
    };
    exector(resolve, reject);
  }
  then(sCb, fCb) {
    // callBack(this.value);
    if (this.state === "PENDING") {
      this.onResolvedCallbacks.push(() => {
        sCb(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        fCb(this.reason);
      });
    } else if (this.state === "FAIL") {
      fCb(this.reson);
    } else if (this.state === "DONE") {
      sCb(this.value);
    }
  }
}
```

- 手写一个 jsonp

思路：
1、需要一个全局回调函数，执行当请求通过 script 标签返回的回调；
2、需要一个发送 script 的请求；
3、服务端拼装返回的 script 脚本；

```
回调函数：

function callback(data) {
  alert(data.message);
}

发送script 的请求：

 function addScriptTag(src){
       var script = document.createElement('script');
       script.setAttribute("type","text/javascript");
       script.src = src;
       document.body.appendChild(script);
  }

服务器端执行并返回script 脚本：

callback({
  id:1
})


```

---

- 手写一个防抖

  思路：何谓防抖，就是防止在没有准备好之前提前触发了，其实就是在一段时间内如果重复触发的话只执行最后一次

```
function debounce(fn, wait = 100) {
  let timer = null; //闭包
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    let me = this;
    setTimeout(() => {
      fn.apply(me, arg);
    }, wait);
  };
}

```

---

- 手写一个截流

  思路：何谓节流，就是当一个操作连续触发时，控制触发的频率，即每一次触发间隔不能超过一定时间

```
function throttle(fn, wait = 100) {
  let start = 0;
  return function (...arg) {
    let me = this;
    let now = new Date().getTime();
    if (now - start > wait) {
      fn.apply(me, arg);
      start = new Date().getTime();
    }
  };
}

```

---

- 写一个深拷贝，考虑 正则，Date 这种类型的数据

## [手写代码](-https://wangyaxing.cn/blog/jsCode/)

---

- 区分数组遍历方式
  目标：let arr = [1,2,3,4,5]

1. for 语句 可以使用 break 跳出循环，continue 跳出当前循环，不能使用 return

```
for (let i = 0; let len = arr.length;i<len;i++){

}
```

2. forEach 不能使用使用 break 和 continue 跳出循环，可以使用 return 跳出本次循环

```
  arr.forEach((v,k)=>{
      console.log(v);
      console.log(k);
  })

```

3. for in 主要是对对象进行遍历，会遍历继承的可遍历属性，可以使用 break 跳出循环，continue 跳出当前循环，不能使用 return

```
   for(let k in arr){
      console.log(k);
      console.log(arr[k]);
   }

```

4. for of 遍历的是 value，对所有可以迭代的都可以使用,可以使用 break 跳出循环，continue 跳出当前循环

```
   for(let v of arr){
      console.log(v);
   }

```

5. map 会返回一个新的数组

## 结论：break 能跳出所有 for for/in for/of 循环，但对于 forEach,map,every,some 是不可以的，这些只能跳出本次循环

### 即：数组方法只能使用 return 跳出循环，for 类只能使用 break 和 continue

- 手写一个单例

```
  1、es5 -指定一个实列变量

   let instance = null;

    let List = function (name) {
      this.name = name;
    };

    List.getInstance = function (name) {
      if (!instance) {
        instance = new List(name);
      }
      return instance;
    };

```

```
  2、es5 -使用构造函数的静态变量

   let List = function (name) {
      this.name = name;
    };

    List.getInstance = function (name) {
      if (!this.instance) {
        //等价于List.instance
        this.instance = new List(name); //此时this指向List本身
      }
      return this.instance;
    };

```

```
  3、es6

   class List {
      constructor(name) {
        if (!List.instance) {
          List.instance = this; //this就是第一次创建的实列
        }
        return List.instance;
      }
    }


```

```
  4、es6

  class List {
    constructor(name) {
      this.name = name;
    }
    static getInstance(name) {
      if (!List.instance) {
        List.instance = new List(name);
      }
      return List.instance;
    }
}


```

---

- 什么是闭包，手写闭包

闭包本质是关于函数作用域和函数执行时上下文、垃圾回收机制相关
正常情况下函数内部变量在函数访问退出时销毁，但是如果一个变量被
子函数访问，则会改变它的回收机制。

常用的闭包场景：单例是最常见的一种闭包
其次比较常用的用循环绑定事件、绑定 setTimeOut

```
function testBb(plus) {
  let a = 100;

  function add() {
    return a + plus;
  }
  return add;
}

```

---

- 理解代理 Proxy 和 Reflect

常用代理方法有：

```
get(target, propKey, receiver)

set(target, propKey,value, receiver)

has(target, propKey)

construct(target, args, newTarget)

apply(target, object, args)


```

[参考文章](https://juejin.cn/post/6844903971794976775)

[参考文章 2](https://www.cnblogs.com/tugenhua0707/p/10306793.html)

---

- 理解 set 和 map

set、map、array、object 都是集合

##### Array 和 Set 对比

都是一个存储多值的容器，两者可以互相转换，但是在使用场景上有区别。如下:
Array 的 indexOf 方法比 Set 的 has 方法效率低下
Set 不含有重复值（可以利用这个特性实现对一个数组的去重）
Set 通过 delete 方法删除某个值，而 Array 只能通过 splice。两者的使用方便程度前者更优
Array 的很多新方法 map、filter、some、every 等是 Set 没有的（但是通过两者可以互相转换来使用）

```
let set = new Set()
// Set转化为数组
let arr = Array.from(set)
let arr = [...set]
// 实例属性（继承自Set）
set.constructor === Set
set.size
// 操作方法
set.add(1) // 添加一个值
set.delete(1) //删除一个值
set.has(1) //判断是否有这个值（Array中的indexOf）
set.clear() //清除所有值
// 获取用于遍历的成员方法(Set的遍历顺序就是插入顺序)
set.keys() // 返回键名的遍历器
set.values() // 返回键值得遍历器
set.entries() // 返回键值对的遍历器
set.forEach() // 循环遍历每个值(和Array的方法一致)
for (let key of set.keys()){}
for (let val of set.values()){}
for (let entry of set.entries()){}
// 使用数组方法来处理set值
set = new Set(arr)
set = new Set([...set].map((x) => x = x * 2))
set = new Set([...set].filter((x) => x > 2))
```

##### Object 和 Map 对比

Object 是字符串-值，Map 是值-值
Object 键为 string 类型,Map 的键是任意类型
手动计算 Object 尺寸,Map.size 可以获取尺寸
Map 的排序是插入顺序
Object 有原型，所以映射中有一些缺省的键。可以理解为 Map=Object.create(null)
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

```
let map = new Map()
// 实例属性(继承自Map)
map.constructor === Map
map.size
// 操作方法
map.set(1,2)
map.get(1)
map.delete(1)
map.has(1)
map.clear()
// 遍历方法
map.keys()
map.values()
map.entries()
map.forEach()
// Map和数组的转换
map = new Map([['key','val'],[2,1]]) // 要求双成员数组
let arr = [...map]
// 值得注意的是Map的键是跟内存绑定的
map.set([1], 's')
map.get([1])
let arr = [1]
let arr1 = [1]
map.set(arr, 's')
map.get(arr)
map.set(arr1, 's')
map.get(arr1)
```

[set 和 map](https://segmentfault.com/a/1190000016411261)

- 理解尾部调用优化

```
"use strict";
// 无优化：尾调用没有返回
function outerFunction() {
 innerFunction();
}
// 无优化：尾调用没有直接返回
function outerFunction() {
 let innerFunctionResult = innerFunction();
 return innerFunctionResult;
}
// 无优化：尾调用返回后必须转型为字符串
function outerFunction() {
 return innerFunction().toString();
}
// 无优化：尾调用是一个闭包
function outerFunction() {
 let foo = 'bar';
 function innerFunction() { return foo; }
 return innerFunction();
}
```

```
"use strict";
// 有优化：栈帧销毁前执行参数计算
function outerFunction(a, b) {
 return innerFunction(a + b);
}
// 有优化：初始返回值不涉及栈帧
function outerFunction(a, b) {
 if (a < b) {
 return a;
 }
 return innerFunction(a + b);
}
// 有优化：两个内部函数都在尾部
function outerFunction(condition) {
 return condition ? innerFunctionA() : innerFunctionB();
}
```

递归优化思路：将运算部分放入参数部分

[尾部优化](https://blog.csdn.net/laoxiaohang/article/details/113482849)

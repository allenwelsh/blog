//属性是否存在：in 运算符
// var obj = { p: 1 };
// console.log(111, 'p' in obj, 'toString' in obj)//====> true true

//hasOwnProperty 判断是否为对象自身的属性

// var obj = {};
// if ('toString' in obj) {
//     console.log(obj.hasOwnProperty('toString')) //==> false
// }

///属性的遍历：for...in 循环

// var obj = { a: 1, b: 2, c: 3 };

// for (var i in obj) {
//     console.log('键名：', i);
//     console.log('键值：', obj[i]);
// }

// 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
// 它不仅遍历对象自身的属性，还遍历继承的属性。

// var a = {};
// console.log(a.prototype); //undefined
// console.log(a.__proto__); //Object {}

// var b = function () { return 1 }
// var a = new b();
// var c = new Function();
// var d = {};

// console.log(0, d.prototype)

// console.log(0, d.__proto__, d.__proto__ === Object.prototype)

// console.log(0, d.__proto__.__proto__)

// console.log(111, a)
// console.log(222, a.__proto__ === b.prototype)

// console.log(3, c.__proto__ === Function.prototype)
// console.log(3, c.prototype)
// console.log(3, b.prototype)
// console.log(31, b.__proto__,b.__proto__===Function.prototype,b.__proto__===Object.prototype)
// console.log(3, c.prototype === b.prototype)

// console.log(b.__proto__ === Function.prototype);  //b {}
// console.log(b.__proto__, b.prototype, Function.prototype === Object.__proto__, Function.__proto__ === Function.prototype);  //function() {}

// console.log(Function.prototype.__proto__ === Object.prototype, Function.__proto__ === Function.prototype);  //function() {}

// Object instanceof Function // true
// Function instanceof Object // true

// function doSomething(){}
// doSomething.prototype.foo = "bar"; // add a property onto the prototype
// var doSomeInstancing = new doSomething();
// doSomeInstancing.prop = "some value"; // add a property onto the object
// console.log( doSomeInstancing,doSomeInstancing.foo );

// function createIncrementor(start) {
//     return function () {
//         console.log(111,start)
//       return start++;
//     };
//   }

//   var inc = createIncrementor(5);

//   inc() // 5
//   inc() // 6
//   inc() // 7

// var fn = function () {
//   alert(100);
// };
// fn.a = 10;
// fn.b = function () {
//   alert(123);
// };
// fn.c = {
//   name: "王福朋",
//   year: 1988
// };

// console.log(fn.b())

// var a = 10;

// function b(fn) {
//   var a = 20;
//   fn()
// }

// b(f)

// function f() {
//   console.log(a)

// }

// function Fo(name){
//    this.name = name
//    console.log(111,this)
// }
//  let f = new Fo(1)

//  Fo(2);

// function Person(name,age){
//    this.name = name;
//    this.age = age
// }

//  function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
//    //  console.log(arguments,arguments.length,arguments[0], arguments instanceof Array)
//    // 将 arguments 对象转为数组
//    var args = [].slice.call(arguments);
//    // 取出构造函数
//    var constructor = args.shift();
//    // 创建一个空对象，继承构造函数的 prototype 属性
//    var context = Object.create(constructor.prototype);
//    //var context = new Object();
//    // context_[[Prototype]] = constructor.prototype
//    // 执行构造函数
//    var result = constructor.apply(context, args);
//    // 如果返回结果是对象，就直接返回，否则返回 context 对象
//    return (typeof result === 'object' && result != null) ? result : context;
//  }

//  // 实例
//  var actor = _new(Person, '张三', 28);
// console.log(111,actor)

// var Base = function () {
//    this.a = 2
// }
// var o1 = new Base();
// var o2 = Object.create(Base);
// console.log(o1.a);
// console.log(o2);

// if (typeof Object.create !== "function") {
//    Object.create = function (proto, propertiesObject) {
//        if (typeof proto !== 'object' && typeof proto !== 'function') {
//            throw new TypeError('Object prototype may only be an Object: ' + proto);
//        } else if (proto === null) {
//            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
//        }

//        if (typeof propertiesObject != 'undefined') {
//            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
//        }

//        function F() {}
//        F.prototype = proto;

//        return new F();
//    };
// }

// var Base = function () {
//    this.a = 2
// }
// Base.prototype.a = 3;
// var o1 = new Base();
// var o2 = Object.create(Base);
// console.log(o1.a);
// console.log(o2.a);

// 比较	new	Object.create
// 构造函数	保留原构造函数属性	丢失原构造函数属性
// 原型链	原构造函数prototype属性	原构造函数/（对象）本身
// 作用对象	function	function和object

// function M1() {
//    this.hello = 'hello';
//  }
//  M1.prototype.a = 1

//  function M2() {
//    this.world = 'world';
//  }

//  function S() {
//    // M1.call(this);
//    // M2.call(this);
//  }
//  console.log(M1.prototype) // 'hello'

//  // 继承 M1
//  S.prototype = Object.create(M1.prototype);
//  // 继承链上加入 M2
//  Object.assign(S.prototype, M2.prototype);

//  // 指定构造函数
// //  S.prototype.constructor = S;

//  var s = new S();
//  console.log(s.hello) // 'hello'
//  console.log(s.world)// 'world'
//  console.log(s.a)// '1'

// let a = () => {
//    return new Promise(resolve => {
//       console.log(22)
//       resolve(1)
//    })
// }

// async function test() {
//    await a();
//    console.log(33)
//    return 2
// }
// console.log(test().then(r => {
//    console.log(r)
// }))
// console.log(111)

// function testAsy(x) {
//    return new Promise(resolve => {
//       console.log(111);
//       setTimeout(() => {
//          console.log(222)
//          // resolve(x);
//       }, 3000)
//    }
//    )
// }
// testAsy(1).then(r=>{
//    console.log(r)
// })

// setTimeout(()=>{
//    console.log("setTimeout4");
// },2000);
// async function testAwt() {
//    let result = await testAsy('hello world');
//    console.log(result);    // 3秒钟之后出现hello world
//    console.log('tangj')   // 3秒钟之后出现tangj
// }
// testAwt();
// console.log('tangSir')  //立即输出tangSir

// let b = async function c() {
//    return await test();
// }

// test().then(res=>{
//    console.log(res)
// })

// function getSomething() {
//    return "something";
// }

// async function testAsync() {
//    return Promise.resolve("hello async");
// }

// async function test() {
//    const v1 = await getSomething();
//    const v2 = await testAsync();
//    console.log(v1, v2);
// }

// test();

// setTimeout(()=>{
//    console.log("setTimeout1");
//    Promise.resolve().then(data => {
//        console.log(222);
//    });
//    setTimeout(()=>{
//       console.log("setTimeout4");
//    });
//    console.log("setTimeout3");

// });
// setTimeout(()=>{
//    console.log("setTimeout2");
// });
// Promise.resolve().then(data=>{
//    console.log(111);
// });
// var tmp = 123;

// if (true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// class Point {
//   constructor(props) {
//     // ...
//     this.id = props.id;
//   }

//   toString() {
//     // ...
//   }

//   toValue() {
//     // ...
//   }
// }

// function Point2(id) {
//   this.id = id;
// }

// Point2.prototype = {
//   toString: function () {
//     // ...
//   },
//   toValue: function () {
//     // ...
//   },
// };

// let p1 = new Point({ id: 1 });
// let p2 = new Point2(1);

// console.log(p1.hasOwnProperty("id"));
// console.log(p2.hasOwnProperty("id"));

// console.log(p1.hasOwnProperty("toString"));
// console.log(p2.hasOwnProperty("toString"));

// console.log(Point.prototype)

// console.log(Object.keys(Point.prototype))
// console.log(Object.keys(Point2.prototype))

// Point.prototype.constructor === Point

//call 和 apply
// var a = {
//   b: 1,
//   show: function (d) {
//     console.log(111, d, this.b);
//   },
// };

// var b = {
//   b: 5,
// };

// Function.prototype.myCall = function (context) {
//   context.fn = this; //1.将函数挂载到传入的对象
//   console.log(111, this);
//   var arg = [...arguments].splice(1); //2.取参数
//   context.fn(...arg); //3.执行对象的方法
//   delete context.fn; //4.移除对象的方法
// };

// // a.show.myCall(b);
// function myCall(fn, obj) {
//   obj.fn = fn;
//   var arg = [...arguments].splice(2);
//   var result = obj.fn(arg);
//   delete obj.fn;
//   return result;
// }
// myCall(a.show, b, "111");

// 继承

// function Father() {
//   this.a = 1;
// }
// Father.prototype.show = function () {
//   console.log(this.a);
//   console.log(this.s);
// };

// function Son() {
//   this.s = 2;
// }
// console.log(11111, new Father());

// Son.prototype = new Father();
// // Son.prototype = Father.prototype;

// Son.prototype.constructor = Son;

// var son1 = new Son();
// son1.show();

// class PromiseA {
//   constructor(exector) {
//     // super();
//     this.state = "PENDING";
//     this.value = undefined;
//     this.reson = undefined;
//     // 存放成功的回调
//     this.onResolvedCallbacks = [];
//     // 存放失败的回调
//     this.onRejectedCallbacks = [];
//     const resolve = (value) => {
//       this.value = value;
//       if (this.state === "PENDING") {
//         this.onResolvedCallbacks.forEach((fn) => fn());
//       }
//       this.state = "DONE";
//     };
//     const reject = (reason) => {
//       this.state = "FAIL";
//       this.reson = reason;
//     };
//     exector(resolve, reject);
//   }
//   then(sCb, fCb) {
//     // callBack(this.value);
//     if (this.state === "PENDING") {
//       this.onResolvedCallbacks.push(() => {
//         sCb(this.value);
//       });
//       this.onRejectedCallbacks.push(() => {
//         fCb(this.reason);
//       });
//     } else if (this.state === "FAIL") {
//       fCb(this.reson);
//     } else if (this.state === "DONE") {
//       sCb(this.value);
//     }
//   }
// }

// let aPromise = new PromiseA(function (resolve, rejec) {
//   // resolve(1);
//   setTimeout(() => {
//     resolve(1);
//   }, 1000);
// });

// aPromise.then((res) => {
//   console.log(111, res);
// });
// console.log(111, aPromise);

// function debounce(fn, wait = 100) {
//   let timer = null; //闭包
//   return function (...arg) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     let me = this;
//     setTimeout(() => {
//       fn.apply(me, arg);
//     }, wait);
//   };
// }

// debounce(() => {
//   console.log(111, "开始执行");
// }, 100);

// function throttle(fn, wait = 100) {
//   let start = 0;
//   return function (...arg) {
//     let me = this;
//     let now = new Date().getTime();
//     if (now - start > wait) {
//       fn.apply(me, arg);
//       start = new Date().getTime();
//     }
//   };
// }

// function deepClone(source, target) {
//   // let type = Object.prototype.toString.call(targetObj);
//   if (typeof source === Object && source !== null) {
//     if (Array.isArray(source)) {
//       source.forEach((val, index) => {
//         let item = undefined;
//         deepClone(val, item);
//         target.push(item);
//       });
//     }
//     if (source instanceof Object) {
//       for (let key in source) {
//         target[key] = deepClone(source[key]);
//       }
//     }
//   } else {
//     target = source;
//   }
// }
//es6
// class List {
//   constructor() {}

//   getList() {}
// }

//es5 -指定一个实列变量

// let instance = null;

// let List = function (name) {
//   this.name = name;
// };

// List.getInstance = function (name) {
//   if (!instance) {
//     instance = new List(name);
//   }
//   return instance;
// };

// let a = List.getInstance("a");
// let b = List.getInstance("b");
// console.log(a === b);

// //es5 -使用构造函数的静态变量

// let List = function (name) {
//   this.name = name;
// };

// List.getInstance = function (name) {
//   if (!this.instance) {
//     //等价于List.instance
//     this.instance = new List(name); //此时this指向List本身
//   }
//   return this.instance;
// };
// let a = List.getInstance("a");
// let b = List.getInstance("b");
// console.log(a === b);

// //es6 -使用class

// class List {
//   constructor(name) {
//     this.name = name;
//     if (!List.instance) {
//       List.instance = this; //this就是第一次创建的实列
//     }
//     return List.instance;
//   }
// }

// let a = new List("a");
// let b = new List("b");
// console.log(a === b);

// //es6 -使用class

// class List {
//   constructor(name) {
//     if (!List.instance) {
//       List.instance = this; //this就是第一次创建的实列
//     }
//     return List.instance;
//   }
// }

// let a = new List("a");
// let b = new List("b");
// console.log(a === b);

// //es6 -使用class

// class List {
//   constructor(name) {
//     this.name = name;
//   }
//   static getInstance(name) {
//     if (!List.instance) {
//       List.instance = new List(name);
//     }
//     return List.instance;
//   }
// }
// let a = List.getInstance("a");
// let b = List.getInstance("b");
// console.log(a === b);

// function testBb(plus) {
//   let a = 100;

//   function add() {
//     return a + plus;
//   }
//   return add;
// }

export function threeSum(sourceArr) {
  let newArr = sourceArr.sort();
  let index = 0;
  let result = [];
  while (sourceArr.length - 2 >= index) {
    let divVal = -sourceArr[index];
    let left = index + 1;
    let right = sourceArr.length - 1;
    while (left < right) {
      let sumVal = sourceArr[left] + sourceArr[right];
      if (sumVal > divVal) {
        right--;
      } else if (sumVal < divVal) {
        left++;
      } else {
        result.push([index, left, right]);
      }
    }
    index++;
  }
  return result;
}

export var countSubstrings = function (s) {
  let count = 0;
  let mid = 0;
  while (mid < s.length) {
    let left = mid;
    let right = mid;
    while (left >= 0 || right < s.length) {
      if (s[left] === s[right]) {
        count++;
        left--;
        right++;
      } else {
        break;
      }
    }
    let leftr = mid;
    let rightr = mid + 1;
    while (leftr >= 0 || rightr < s.length) {
      if (s[leftr] === s[rightr]) {
        count++;
        leftr--;
        rightr++;
      } else {
        break;
      }
    }
    mid++;
  }
  return count;
};

function show() {
  console.log(1111);
}

function throttle(fn, timer) {
  //节流，延迟执行时间
  let pre = 0;

  return function () {
    var now = new Date();
    if (now - pre > timer) {
      fn.call(this);
      pre = now;
    }
  };
}

let newShow = throttle(show, 1000);

setInterval(newShow, 100);

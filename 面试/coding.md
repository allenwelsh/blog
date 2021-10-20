### 1. 手写 Object.create

```js
//使用示例
let proto = {
  name: 1,
};

let a = Object.create(proto);
//实现

function myCreate(proto) {
  function Fn() {}
  Fn.prototype = proto;
  Fn.prototype.constructor = Fn;
  let obj = new Fn();
  return obj;
}
let b = myCreate(proto);
```

---

### 2. 手写 instanceof 方法

```js
//使用示例
function F() {
  this.name = 1;
}

let a = new F();

a instanceof Object;

function myInstanceof(left, right) {
  let _ptoto = left.__proto__;
  let prototype = right.prototype;
  let flag = false;
  while (_ptoto && !flag) {
    if (_ptoto === prototype) {
      flag = true;
    } else {
      _ptoto = _ptoto.__proto__;
    }
  }
  return flag;
}
```

---

### 3. 手写 new 操作符

```js
//使用示例
function F() {
  this.name = 1;
}
let a = new F();

//实现
function myNew(Fn, props) {
  let prototype = Fn.prototype;
  if (typeof Fn.constructor !== "function") {
    return false;
  }
  let object = Object.create(prototype);
  let result = Fn.constructor.apply(object, props);
  if (result && typeof result === "object") {
    return result;
  } else {
    return object;
  }
}
```

---

---

### 4. 手写 Promise

```js
//使用示例

let a = new Promise((resolve, reject) => {
  resolve(1);
});
a.then();

//实现
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class MyPromise(){
    constructor(exector){
        this.value = '';
        this.state = PENDING;
        this.error = PENDING;

        this.resolveCbs = [];
        this.rejectCbs = [];
        exector(this.resolve,this.reject)
    }
    resolve(value){
        if(this.state == PENDING){
            this.value = value;
            this.state = RESOLVED;
            //执行回调
            this.resolveCbs.forEach(cb=>{
                cb(value)
            })
        }
    }
    reject(error){
        if(this.state == PENDING){
            this.error = error;
            this.state = REJECTED;
            //执行回调
             this.rejectCbs.forEach(cb=>{
                cb(value)
            })
        }
    }
    then(){
        if(this.state===PENDING){

        }else if(this.state===REJECTED){

        }else if(this.state===RESOLVED){

        }
    }

}

```

---

### 5. 手写防抖函数

```js
//事件触发后多长时间在执行，如果这段时间时间内有新的时间，则重新计时
//使用示例
let newFn = debounce(fn, 300);
function debounce(fn, delay) {
  let timer = null;
  let
  return function () {
      if(timer){
        clearTimeout(timer)
      }else{
        timer =  setTimeout(()=>{
            fn(arguments)
        },delay)
      }
  };
}
```

---

### 6. 手写截流函数

```js
//使用示例,一段时间内只能执行一次
let newFn = throttle(fn, 300);

function throttle(fn, delay) {
  let pre = new Date();
  return function () {
    let now = new Date();
    if (now - pre > delay) {
      fn(arguments);
      pre = new Date();
    }
  };
}
```

---

### 7. 手写类型判断函数

```js
function getType(value) {
  if (value === null) {
    return "null";
  } else if (typeof value === "object") {
    //引用类型
    let objectType = Object.prototype.toString.call(value);
    let type = objectType.split(" ")[1];
    return type;
  } else {
    return typeof value;
  }
}
```

---

### 8. 手写 call

```js
Function.prototype.myCall = function (context) {
  let args = [...arguments].slice(1);
  context.fn = this;
  let result = context.fn(args);
  delete context.fn;
  return result;
};
```

### 9. 深拷贝

```js
function deepClone(source) {
  if (!source || typeof source !== "object") return;
  let newObject = {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === "object") {
        newObject[key] = deepClone(source[key]);
      }
    } else {
      newObject[key] = source[key];
    }
  }
}
```

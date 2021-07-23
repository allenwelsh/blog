// 排序算法- 冒泡
//关键点重复i 次
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let tpl = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tpl;
      }
    }
  }
  return arr;
}

// 排序算法-插入排序
//关键点arr[j + 1] = arr[j];移位
function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let tpl = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > tpl) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = tpl;
  }
  return arr;
}

// 排序算法-选择

function sort2(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    let tpl = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tpl;
  }
  return arr;
}

// 排序算法-归并
// 关键点：合并有序数组

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor((arr.length - 1) / 2);
  let leftArr = mergeSort(arr.slice(0, mid + 1));
  let rightArr = mergeSort(arr.slice(mid + 1));
  let tplArr = [];
  while (leftArr.length && rightArr.length) {
    //合并有序数组
    if (leftArr[0] < rightArr[0]) {
      tplArr.push(leftArr.shift());
    } else {
      tplArr.push(rightArr.shift());
    }
  }
  if (leftArr.length) {
    return tplArr.concat(leftArr);
  } else {
    return tplArr.concat(rightArr);
  }
}

// 排序算法-快速排序

// 关键点：左右数组

function qSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let baseIndex = Math.floor((arr.length - 1) / 2);
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[baseIndex]) {
      right.push(arr[i]);
    } else if (i !== baseIndex) {
      left.push(arr[i]);
    }
  }
  return [].concat(qSort(left), [arr[baseIndex]], qSort(right));
}

//单例模式

//构造函数
// let instance = null;
function List() {
  if (!List.instance) {
    this.time = new Date().getTime();
    List.instance = this;
  }
  return List.instance;
}
let a = new List();
let b = new List();
console.log(a, b, a === b);

//es5 class模式

class List {
  constructor() {
    if (!List.instance) {
      this.time = new Date().getTime();
      List.instance = this;
    }
    return List.instance;
  }
}

let a = new List();
let b = new List();
console.log(a, b, a === b);
//es6 class模式

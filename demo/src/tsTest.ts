// TypeScript的原始类型包括: boolean、number、string、void、undefined、null、symbol、bigint。

// let notSure: any = 4;
// notSure = "maybe a string instead";

//@ts-ignore
export function threeSum(sourceArr) {
  let newArr = sourceArr.sort();
  let index = 0;
  let result: any = [];
  while (newArr.length - 2 >= index) {
    let divVal = 0 - newArr[index];
    let left = index + 1;
    let right = newArr.length - 1;
    while (left < right) {
      let sumVal = newArr[left] + newArr[right];
      if (sumVal > divVal) {
        right--;
      } else if (sumVal < divVal) {
        left++;
      } else {
        result.push([newArr[index], newArr[left], newArr[right]]);
        break;
      }
    }
    index++;
  }
  return result;
}


//@ts-ignore
export function reverseStr(str) {
  let strArr = str.split();
  return strArr.reverse().join();

}

//@ts-ignore


export function minArr(arr, target) {
  let slow = 0;
  let min = 0;
  while (slow < arr.length - 2) {
    let fast = slow + 1;
    let sum = arr[slow];
    while (fast < arr.length - 1) {
      if (sum + arr[fast] < target) {
        sum += arr[fast];
        fast++
      } else {
        if (min === 0 || min > fast - slow) {
          min = fast - slow
        }
        break;
      }
    }
    slow++;
  }
  return min
}



//@ts-ignore

export function maxSlidingWindowTest(arr, kl) {
  if (arr.length < kl) {
    return false
  }
  let left = 0;
  let maxArr = [];
  while (left <= arr.length - kl) {
    let subArr = arr.slice(left, left + kl);
    let maxV = Math.max(...subArr);
    maxArr.push(maxV);
    left++
  }
  return maxArr;
}



// var maxSlidingWindow = function (arr, kl) {
//   if (arr.length < kl) {
//     return false
//   }
//   if (arr.length == kl) {
//     let max = Math.max(...arr);
//     return [max]
//   }
//   let left = 0;
//   let maxArr = [];
//   let slideWindow = []
//   while (left <= arr.length - kl) {
//     if (slideWindow.length == 0) {//先构建一个滑动窗口
//       let subArr = arr.slice(left, left + kl);
//       //@ts-ignore
//       let sortArr = subArr.sort((a, b) => a - b);
//       slideWindow = sortArr;
//     } else {
//       slideWindow[kl - 1] = arr[left + kl - 1];
//       let j = kl - 1;
//       while (j >= 0) {
//         if (slideWindow[j] < slideWindow[j - 1]) {
//           //@ts-ignore
//           let min = slideWindow[j];
//           slideWindow[j] = slideWindow[j - 1];
//           slideWindow[j - 1] = min;
//         }
//         j--
//       }
//     }
//     maxArr.push(slideWindow[kl - 1]);
//     if (slideWindow[kl - 1] === arr[left]) {//如果滑出的item是最大值，
//       slideWindow.pop();
//     } else {
//       slideWindow.shift();//如果不是，删除最小值
//     }
//     left++
//   }
//   return maxArr;
// }
// var a = [9, 10, 9, -7, -4, -8, 2, -6]


// var k = 5

// maxSlidingWindow(a, k)

//@ts-ignore

// var equalSubstring = function (s, t, maxCost) {

//   let sArr = s.split('');
//   let tArr = t.split('');
//   let left = 0;
//   let right = 0;
//   //@ts-ignore
//   let diff = sArr.map((r, index) => {
//     return Math.abs(r.charCodeAt() - tArr[index].charCodeAt())
//   });
//   let max = 0;
//   let cost = 0;
//   while (right < sArr.length) {
//     cost = cost + diff[right];
//     while (cost > maxCost) {
//       cost = cost - diff[left];
//       left++
//     }
//     max = Math.max(max, (right - left + 1));
//     right++
//   }
//   return max

// };

// var s = "abcd", t = "bcdf", maxCost = 3

// equalSubstring(s, t, maxCost)

//@ts-ignore
var maxVowels = function (s, k) {
  const vowels = ['a', 'i', 'e', 'o', 'u'];
  const sArr = s.split('');
  //@ts-ignore
  let window = [];
  let max = 0;
  let left = 0;
  let subArr = sArr.slice(0, k)
  window = subArr;
  for (let i = 0; i < k; i++) {
    if (vowels.includes(subArr[i])) {
      max++;
    }
  }
  let newMax = max;
  while (left < sArr.length - k + 1) {
    if (vowels.includes(window[0])) {
      newMax--
    }
    if (vowels.includes(sArr[left + k - 1])) {
      newMax++
    }
    max = Math.max(max, newMax);
    window.shift();
    window.push(sArr[left + k - 1])
  }
  left++
  return max
};

var s = "novowels", k = 1
maxVowels(s, k)
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// for (let i = 0; i < arr.length; ++i)
// arr.forEach((v, i) => { /* ... */ })
// for (let i in arr)
// for (const v of arr)


function twoSum(nums: number[], target: number): number[] {
  let indexArr: number[] = []
  nums.forEach((v, k) => {
    let re = target - v;
    let newNums = nums.slice(k + 1, nums.length)
    let index = newNums.indexOf(re);
    if (index !== -1) {
      indexArr = [k, index + k + 1]
    }
  })
  return indexArr;
};


// console.log(twoSum([3, 3], 6))



// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。


function spiralOrder(matrix: number[][]): number[] {

  let matrixLen: number = matrix.length;
  let matrixDeep: number = matrix[0].length;
  let target: number[] = [];
  let top: number = 0;
  let left: number = 0;
  let bottom: number = matrixLen - 1;
  let right: number = matrixDeep - 1;

  while (right >= left && bottom >= top) {
    //从top left 到top right
    for (let i = left; i < right; i++) {
      target.push(matrix[top][i])
    }
    //从top right 到bottom right
    for (let i = top; i < bottom; i++) {
      target.push(matrix[i][right])
    }
    //从bottom right 到bottom left
    for (let i = right; i > left; i--) {
      target.push(matrix[bottom][i])
    }
    //从bottom left 到top left
    for (let i = bottom; i > top + 1; i--) {
      target.push(matrix[i][left])
    }
    [top, bottom, left, right] = [top + 1, bottom - 1, left + 1, right - 1]

  }
  return target;

};


// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。


function lengthOfLongestSubstring(s: string): number {
  let maxStr: string = '';
  for (let i: number = 0; i < s.length; i++) {
    let chart: string = s[i];
    for (let j: number = i + 1; j < s.length; j++) {
      if (chart.indexOf(s[j]) == -1) {
        chart += s[j];
      } else {
        break;
      }
    }
    if (chart.length > maxStr.length) {
      maxStr = chart;
    }
  }
  console.log(maxStr)
  return maxStr.length;
};

lengthOfLongestSubstring("abcabcbb")
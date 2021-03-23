# 性能优化

1、两栏布局（要求：垂直两栏，左边固定右边自适应）

方法 一 :absolute

```
       .container {
            position: relative; // 这句一定要，定位以祖宗中第一个非static为准进行绝对定位
        }
        .left {
            width: 200px;
            height: 300px;
            position: absolute;
            top: 0;
            left: 0;
            background-color:red;
        }
        .right {
            padding-left: 200px;
            width: 100%;
            height: 300px;
            background:blue
        }

```

方法二 :flex 布局

```
        .container {
        display: flex;
        justify-content: space-between;
        }
        .left{
        }
        .right{
        flex: 1;
        }
```

---

2、三栏布局（要求：垂直三栏布局，左右两栏宽度固定，中间自适应）

方法一，圣杯布局

```
 <style>
        .container{
            padding-left: 200px;
            padding-right: 100px;
        }
         .container>div{
            float: left;
            height: 200px;
        }
        .center{
            width: 100%;
            background-color: aqua
        }
        .left{
            width: 200px;
            position: relative;
            margin-left: -100%;
            right: 200px;
            background-color: aliceblue
         }
         .right{
             width: 100px;
             margin-right: -100px;
             background-color: antiquewhite
         }
    </style>
    <div class="container">
        <div class="center con"></div>
        <div class="left con"></div>
        <div class="right con"></div>
    </div>

```

方法二 :flex 布局

方法三：决对定位

```
        .center{
            position:absolute;
            left:100px;
            right:100px;
            top:0;
            bottom:0;
            background-color: aqua
        }
        .left{
             float:left;
             width:100px;
        }
         .right{
            float:right;
            width:100px;
         }
```

方法四：calc

```
 .con{
    float: left;
   }
     .center{
         margin-left: 100px;
         margin-right: 100px;
         width: calc(100% - 220px);
     }

```

---

三、水平垂直居中（实现子元素的水平垂直居中）

方法一：通过 position 和 margin 居中

```
    .child {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
    }

```

方法二：通过 flex 进行居中

```
    .parent {
      display: flex;
      justify-content: center;
      align-items: center;
    }

```

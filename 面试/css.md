# css 面试总结

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

---

4、flex 布局

- 使用了 flex 布局之后子元素的 float、clear 和 vertical-align 属性将失效
- flex 布局的基础分为容器(container)和项目（item）
- 在容器内部分为水平的主轴（main axis）和垂直的交叉轴（cross axis）

容器上的属性 6 个：

- flex-direction:属性决定主轴的方向 谁是主轴（flex_v flex_h）
- flex-wrap:是否换行
- flex-flow：flex-direction 和 flex-wrap 简写
- justify-content:主轴上的对齐方式
- align-items 交叉轴对齐方式
- align-content

项目上的属性 6 个：

- order 调整顺序
- flex-grow 当容器有多余空间应该怎么分配，默认是 0
- flex-shrink 当容器余空间不足应该怎么缩小，默认是 1
- flex-basis 提前定义项目的宽度 默认是 auto
- flex
- align-self 单独处理项目在交叉轴对齐方式，覆盖 align-items

flex 其实是 flex-grow、flex-shrink、flex-basis 的简称

flex 这些属性是会覆盖项目本身的 with 的

5、行内元素

- 行内元素不可以设置宽高
- 行内元素水平方向的 margin-left; margin-right; padding-left; padding-right;可以生效。但是竖直方向的 margin-bottom; margin-top; padding-top; padding-bottom 不能生效

6、盒模型

- 盒模型分为标准盒模型和 IE 盒模型
- 标准盒模型的高宽是不包含 padding 和 border
- 不过可以通过 box-sizing 来设置盒模型
- content-box | border-box | padding-box |inherit
- 我们正常期待的是宽高应该包含 padding 和 border，所以我们一般全局设置为 border-box（content-box 的最大缺点就是：当你想让两个子容器 float:left，宽度各 50%，然后给一点 padding，最后让子容器并排充满父容器，一切想的挺美好，然而你发现结果并不是这么美好，因为子容器的盒子宽度已经超出了父容器的一半，导致了折行）

7、文档流

- 文档流为普通文档流、浮动文档流和脱离文档流；

- float 虽然脱离了文档流但是仍然会占据位置

- 定位会脱离文档流，不占据原来的位置

8、BFC

- 它是一个独立的渲染区域,与其他的 BFC 相互独立
- float 为 left|right，overflow 为 hidden|auto|scroll ，position 为 absolute|fixed 都会创建 BFC
- BFC 会阻止垂直外边距折叠
- BFC 不会重叠浮动元素
- BFC 可以包含浮动----清除浮动

9、 display:none,跟 visible:hidden 的效果

- display: none 不占据空间 ， 会触发 reflow（回流），进行渲染
- visibility:hidden 占据空间，只会触发 repaint（重绘），因为没有发现位置变化，不进行渲染

10、css3 语法

- transition:CSS 属性，花费时间，效果曲线(默认 ease)，延迟时间(默认 0)
- animation：动画名称，一个周期花费时间，运动曲线（默认 ease），动画延迟（默认 0），播放次数（默认 1），是否反向播放动画（默认 normal），是否暂停动画（默认 running）
- transform：对对象本身对形状修改
  1、rotate - 旋转
  transform: rotate(45deg)--- 2D 旋转
  transform: rotate3d(x,y,z,angle)--- 3D 旋转
  2、scale - 缩放
  transfrom:scale(x,y);
  3、translate- 移动(可以用于性能优化，主要原因是不会引起重排重绘)
  - [Composite](https://fed.taobao.org/blog/taofed/do71ct/performance-composite/)
- box-shadow： 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置 inset 就是从外往里）;

- 图片边框：border-image

- 倒影：-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片
- 超出省略号： text-overflow:ellipsis;
- 颜色：支持 rgba 和 hsla
- flex 布局
- 渐变色
- filter：支持饱和度、黑白图、发色等等
- 媒体查询：@media screen
  [个人总结（css3 新特性）](https://juejin.cn/post/6844903518520901639#heading-53)

11、css 选择器权重及性能优化

##### 权重

> 权重计算 0000,每存在一个选择器便在响应位上加一

- ！important（Infinity）

- 1.千位:如果是内联样式,记为 1,否则为 0

- 2.百位:等于选择器中所有 id 选择器的数量

- 3.十位:等于选择器中所有类选择器,属性选择器,伪类选择器的数量

- 4.个位:等于选择器中所有元素（标签）选择器,伪元素选择器的数量

- 5.通配符选择器为 0

css 权重（256 进制,多个直接进进行相加（派生选择器/父子选择器））

##### 优化方案

> 浏览器读取选择器，遵循的原则是从选择器的右边到左边读取

选择器的最后一部分，也就是选择器的最右边部分被称为 关键选择器 （keyselector），它将决定 CSS 选择器的效率

- 网站编写 CSS 时，应该优先考虑使用 class 选择器，避免使用通配符选择器（\*）和属性选择器（a[rel=”external”]），后代选择器与标签选择器结合使用也应避免;
- 使用 id 选择器的性能最好，但是编写时要注意其唯一性，谨慎使用;

12、css 可继承属性

- 字体系列：font-family、font-size 等
- 文本系列：text-align、line-height 等
- 表格布局属性：caption-side 等
- 列表系列：list-style-type、list-style-position 等

13、如何实现一个三角形

```css
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

14、如何解决 css 兼容性问题

- 标准化：解决不同浏览器初始化的差异；
- css3 前缀：解决不同浏览器对新特性的兼容；
- css hack：
  - 条件语句 针对不支持 h5 标签从而引起 css 不识别 html5shiv
  - 针对媒体查询不支持引入 respon.js
- 其他一些常见兼容性问题：flex，opacity

15、less

- 变量
- Mixin 混合

```less
.test(@w,@h) {
  width: @w;
  height: @h;
  border: 1px solid red;
}

div {
  //调用混合函数，按顺序传递参数
  .test(200px,300px);
  //    <!-- .test(@w:200px,@h:200px) -->
}

//带条件的混合

.mixin( @a )when( lightness(@a)>=50% ) {
  background-color: black;
}
.mixin( @a )when( lightness(@a)<50% ) {
  background-color: white;
}

.class1 {
  .mixin( #aaa );
}
.class2 {
  .mixin( #333 );
}

//循环
loop( @count )when( @count > 0 ){
    h@{count}{
        padding: ( 10px * @count );
    }
    .loop((@count - 1));
}

div{
    .loop(5);
}
```

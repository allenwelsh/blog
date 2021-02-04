# bale理解

**本文将从下面几个问题来回答对babel对理解：**

```
1. 什么是bable；
2. bable的工作原理是什么；
3. babel应该怎么使用、任何配置；
```

**一、什么是babel：**

>Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.


我们已经能够熟练地使用 es2015+ 的语法。但是对于浏览器来说，可能和它们还不够熟悉，我们得让浏览器理解它们，这就需要 Babel.

Babel 是一个通用的多功能 JavaScript 编译器，但与一般编译器不同的是它只是把同种语言的高版本规则转换为低版本规则，而不是输出另一种低级机器可识别的代码，并且在依赖不同的拓展插件下可用于不同形式的静态分析。（静态分析：指在不需要执行代码的前提下对代码进行分析以及相应处理的一个过程，主要应用于语法检查、编译、代码高亮、代码转换、优化、压缩等等）


**二、bable的工作原理是什么：**



可以理解babel本质也是一个编译器，只是这个编译器输出对不是二进制机器码而是在浏览器能运行对js语法. 所以更准确点说他是一个转译器，它工作分为3个步骤：

```
1. 解析 Parse
2. 转换 Transform
3. Generate
```
![babel原理](https://haitao.nos.netease.com/3de22c36-9220-4ba7-8e1e-b0be28d563fd_1650_594.jpg)

- 解析 Parse

将代码解析生成抽象语法树( 即AST )，也就是计算机理解我们代码的方式(扩展：一般来说每个 js 引擎都有自己的 AST，比如熟知的 v8，chrome 浏览器会把 js 源码转换为抽象语法树，再进一步转换为字节码或机器代码)，而 babel 则是通过 babylon 实现的 。简单来说就是一个对于 JS 代码的一个编译过程，进行了词法分析与语法分析的过程。

谈到AST就必须理解js引擎是如何理解我们代码的，简答来说是两个步骤：1、分词; 2、语意分析。


1、分词：

将整个代码字符串分割成语法单元数组（token）

JS 代码中的语法单元主要指如标识符（if/else、return、function）、运算符、括号、数字、字符串、空格等等能被解析的最小单元。比如下面的代码生成的语法单元数组如下：

[分词小工具](https://esprima.org/demo/parse.html)



```
var answer = 6 * 7;
=> 
//分词token
[
    {
        "type": "Keyword",
        "value": "var"
    },
    {
        "type": "Identifier",
        "value": "answer"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "6"
    },
    {
        "type": "Punctuator",
        "value": "*"
    },
    {
        "type": "Numeric",
        "value": "7"
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```


2、语意分析：

语义分析则是将得到的词汇进行一个立体的组合，确定词语之间的关系。考虑到编程语言的各种从属关系的复杂性，语义分析的过程又是在遍历得到的语法单元组，相对而言就会变得更复杂。

简单来说语义分析既是对语句和表达式识别，这是个递归过程，在解析中，babel 会在解析每个语句和表达式的过程中设置一个暂存器，用来暂存当前读取到的语法单元，如果解析失败，就会返回之前的暂存点，再按照另一种方式进行解析，如果解析成功，则将暂存点销毁，不断重复以上操作，直到最后生成对应的语法树。

``````
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Literal",
                            "value": 6,
                            "raw": "6"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 7,
                            "raw": "7"
                        }
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
``````

- 转换 Transform

对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新及移除等操作


- 生成 Generate

将变换后的 AST 再转换为JS代码, 使用到的模块是 babel-generator。

而 babel-core 模块则是将三者结合使得对外提供的API做了一个简化。

此外需要注意的是，babel 只是转译新标准引入的语法，比如ES6箭头函数：而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的 API 等（Proxy、Set 等）, 这些事不会转译的，需要引入对应的 polyfill 来解决。

而我们编写的 babel 插件则主要专注于第二步转换过程的工作，专注于对于代码的转化规则的拓展，解析与生成的偏底层相关操作则有对应的模块支持，在此我们理解它主要做了什么即可。


经过babel转换后高版本js语法就变成了ECMAScript 2015+ 的代码，支持在旧的浏览器上运行，如：

``````
// es2015 的 const 和 arrow function
const add = (a, b) => a + b;
let a =1;
let b ={a};

// Babel 转译后
var add = function add(a, b) {
  return a + b;
};
var a = 1;
var b = { a: a };
``````


**三、babel该如何使用及配置：**

目前JS没有统一的构建构建、平台，所以babel支持对各种工具对基gulp、webpack、node

开始使用babel之前我们首先理解几个babel文件：

``````
babel-cli 是一种在命令行下使用Babel编译工具
babel-register 在node下运行babel的小工具
babel-polyfill Babel一起使用的polyfill是babel-polyfill
babele-runtime 转换api工具
babel-core Babel 的核心代码
babel-loader 解析 js 的 loader
babel-preset-react 用于解析 jsx 语法
babel-preset-env 取代之前的 babel-preset-es2015 babel-preset-es2016 等包，解析 ES6 等语法
babel-preset-stage-0 同类的还有 stage-1、stage-2、stage-3，stage-0 包含es7的解析内容，且同时包含 stage-1/2/3 的所有功能

``````
``````
* 以上是babel6,如果需要使用babel7的话需要增加@前缀，@babel-core
``````

- babel-cli

从名字就可以理解，这个是一个命令行工具，运行在node环境，能将es6或者es7语法的js文件转换为es5文件。

``````
$ npm install --global babel-cli
$ babel example.js --out-file compiled.js
# 或
$ babel example.js -o compiled.js

``````
- babel-register

babel-cli会把一个文件转换成一个es5文件执行，但是如果你想直接执行这个文件：
``````
$ node index.js

`````` 
 直接来运行它是不会使用 Babel 来编译的，这个时候就需要使用babel-register，首先在项目中创建 register.js 文件并添加如下代码：
``````
require("babel-register");
require("./index.js");

`````` 
这样做可以把 Babel 注册到 Node 的模块系统中并开始编译其中 require 的所有文件。

现在我们可以使用 register.js 来代替 node index.js 来运行了。
``````
$ node register.js
`````` 

- babel-polyfill与babele-runtime

Babel默认只转换新的JavaScript语法，而不转换新的API。 例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。 如果想使用这些新的对象和方法，则需要为当前环境提供一个polyfill

目前最常用的配合Babel一起使用的polyfill是babel-polyfill，它会”加载整个polyfill库”，针对编译的代码中新的API进行处理，并且在代码中插入一些帮助函数。

babel-polyfill解决了Babel不转换新API的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。 （比如：上述的帮助函数_defineProperty有可能在很多的代码模块文件中都会被插入）

Babel为了解决这个问题，提供了单独的包babel-runtime用以提供编译模块的工具函数， 启用插件babel-plugin-transform-runtime后，Babel就会使用babel-runtime下的工具函数，上述的代码就会变成这样

- babel-core 

以上都是基于cli或者node环境时使用babel，如果你想通过代码的方式实现babel，这个时候就需要使用babel-core

`````` 
$ npm install babel-core
var babel = require("babel-core");
`````` 
字符串形式的 JavaScript 代码可以直接使用 babel.transform 来编译。
`````` 
babel.transform("code();", options);
// => { code, map, ast }
`````` 

### 配置 Babel 

目前为止通过运行 Babel 自己我们并没能“翻译”代码，而仅仅是把代码从一处拷贝到了另一处。

这是因为我们还没告诉 Babel 要做什么。

你可以通过安装插件（plugins）或预设（presets，也就是一组插件来指示 Babel 去做什么事情。

- .babelrc

在我们告诉 Babel 该做什么之前，我们需要创建一个配置文件。你需要做的就是在项目的根路径下创建 .babelrc 文件。然后输入以下内容作为开始：
`````` 
{
  "presets": [],
  "plugins": []
}
`````` 
这个文件就是用来让 Babel 做你要它做的事情的配置文件。


- plugins
上面说过babel本身是不会去翻译代码，需要插件告诉babel需要做什么，比如你需要翻译箭头函数就需要transform-es2015-arrow-functions插件。

- presets(预设)

不想自己动手组合插件？没问题！preset 可以作为 Babel 插件的组合，甚至可以作为可以共享的 options 配置。

官方针对常用环境编写了一些 preset：

`````` 
babel/preset-env
babel/preset-flow
babel/preset-react 翻译jsx文件
babel/preset-typescript
babel-preset-react-app creat-react-app
babel-preset-es2015 es6=>es5
babel-preset-stage-x 提案阶段语法
`````` 


- presets与plugins差别

举个例子， babel-preset-es2015 包含了 transform-es2015-arrow-functions(编译箭头函数)、transform-es2015-block-scoping(编译 const、let)、transform-es2015-classes(编译class)等几十个插件

如果不使用 preset，如果想要用完整的 es6 语法，使用者可能需要自己配置几十个 plugins。


- babel-preset-env

单独讲一下babel-preset-env 这个预设插件，
为了让开发者能够尽早用上新的JS特性，babel团队开发了babel-preset-latest。这个preset比较特殊，它是多个preset的集合(es2015+)，并且随着ECMA规范的更新更增加它的内容。

随着时间的推移，babel-preset-latest 包含的插件越来越多，这带来了如下问题：

1、加载的插件越来越多，编译速度会越来越慢；

2、随着用户浏览器的升级，ECMA规范的支持逐步完善，编译至低版本规范的必要性在减少（比如ES6 -> ES5），多余的转换不单降低执行效率，还浪费带宽。

因为上述问题的存在，babel官方推出了babel-preset-env插件。它可以根据开发者的配置，按需加载插件。

需要支持的平台：比如node、浏览器等。
需要支持的平台的版本：比如支持node@6.1等。

### 参考文献 ###

- https://segmentfault.com/a/1190000016359110

- https://esprima.org/demo/parse.html#

- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md

- https://www.babeljs.cn/



# 深入理解 HTTP 协议二

在[深入理解 HTTP 协议一](https://www.jianshu.com/p/33436639c107)中，分析了：

- 网络体系结构
- 数据传输过程（主要是 TCP）
- HTTP 基本特征

在本章中主要分析：

- http1.0、http1.1 及 http2 版本区别
- http 报文结构

#### 一、http1.0、http1.1 及 http2 版本区别

##### http1.0

HTTP/1.0$\color{red}{最大的缺点}$是一次 TCP 请求只能发送一次 http 请求，每次请求资源的时候都需要重新发起 TCP 请求。

![http1.0](https://yn-oa.oss-cn-shanghai.aliyuncs.com/static/static/temp/WeChatcb1f4ca253bf9a03ac2f3815eaf8cadd.png)

上图是 http1.0 请求一次资源的时间过程，可以看出一次请求包含 2 个 RTT,一个是 TCP 连接，一个 http 报文数据)。

**http1.0 的持续连接连接问题可以用$\color{red}{Connection: keep-alive}$实现**

_不过 http1.0 的 keep-alive 默认是关闭的_

##### http1.1

http1.1 主要就是解决了$\color{red}{持续连接}$ 问题，即 TCP 连接默认不关闭，可以被多个请求复用，不用声明 Connection: keep-alive.

**对头堵塞**

> http1.1 版允许复用 TCP 连接，但是同一个 TCP 连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着.

Chrome 有个机制，对于同一个域名，默认允许同时建立 6 个 TCP 持久连接，使用持久连接时，虽然能公用一个 TCP 管道，但是在一个管道中同一时刻只能处理一个请求，在当前的请求没有结束之前，其他的请求只能处于阻塞状态。另外如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成.

![http1.1](https://yn-oa.oss-cn-shanghai.aliyuncs.com/static/static/temp/WechatIMG390.jpeg)

上图是简书的一个页面的请求次数，大概是 75 个，这还是比较少的，浏览器只能够同时建立 6 个 TCP 持久连接，那就意味着有 60 多个请求需要等待.

![等待](https://yn-oa.oss-cn-shanghai.aliyuncs.com/static/static/temp/WechatIMG391.png)

可以看到同一时刻，只有 8 个请求在执行。

这就是为什么我们强调要用 Spriting 合并多张小图为一张大图,这样可以减少 http 请求的次数。

我们在使用 webpack 打包资源切分包的时候也不是说包越小越好，太小只会增加 http 请求次数，从而影响性能。

**头部报文巨大**

http1.1 另外一个缺点是 http 头较大（相对 http2），主要原因是 http1.1 的头信息只能是文本（ASCII 编码）不能是二进制流。

##### http2

http2 主要改进点：

- Header 的压缩
- Server Push
- 请求/响应管线化
- 修复在 HTTP 1.x 的队头阻塞问题
- 在单个 TCP 连接里多工复用请求

详细参考请[深入浅出：HTTP/2](https://www.cnblogs.com/confach/p/10141273.html)

目前主流浏览器都支持 HTTP/2，判断网站是否支持 http2 可以通过一下代码判断

```
(function(){
    // 保证这个方法只在支持loadTimes的chrome浏览器下执行
    if(window.chrome && typeof chrome.loadTimes === 'function') {
        var loadTimes = window.chrome.loadTimes();
        var spdy = loadTimes.wasFetchedViaSpdy;
        var info = loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo;
        // 就以 「h2」作为判断标识
        if(spdy && /^h2/i.test(info)) {
            return console.info('本站点使用了HTTP/2');
        }
    }
    console.warn('本站点没有使用HTTP/2');
})();

```

测试了一下[淘宝](www.taobao.com)是支持 http2 的。官方解释使用 HTTP/2 能带来 20%~60%的效率提升，所以 HTTP/2 也是前端性能优化的一个方向。

#### 二、HTTP 报文结构

我们在调试模式下查看 connect 内容，能看到基本上分为 3 块，基本信息、请求 header、响应 header。

![http报文](https://yn-oa.oss-cn-shanghai.aliyuncs.com/static/static/temp/WechatIMG387.png)

HTTP 是一个基于请求/响应模式的、一问一答的方式实现服务。即我们通常所说的 Request/Response，对应的就是请求报文和响应报文。

**请求报文**

![请求报文结构](https://pic002.cnblogs.com/images/2012/426620/2012072810301161.png)

主要分为：

- 报文首部（请求行+请求头部）
- 空行
- 报文内容

_请求行_

请求行由请求$\color{red}{方法字段}$、$\color{red}{URL字段}$和$\color{red}{HTTP 协议版本字段}$3 个字段组成，它们用空格分隔。例如，GET /index.html HTTP/1.1。

常用请求方法有：

```
GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT
```

_请求头部_

请求头部一般分为：

- 通用首部(General Header)
- 请求首部(Request Header)
- 实体首部(Entity Header Fields)

请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。请求头部通知服务器有关于客户端请求的信息

常用请求头部：

```
User-Agent：产生请求的浏览器类型。
Accept：客户端可识别的内容类型列表。
Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。
```

_报文内容_

$\color{red}{请求数据不在GET方法中使用，而是在POST方法中使用。}$POST 方法适用于需要客户填写表单的场合。与请求数据相关的最常使用的请求头是 Content-Type 和 Content-Length.

**响应报文**

![响应报文](https://user-gold-cdn.xitu.io/2020/4/13/171738c10d800265?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

响应报文与请求报文的差异在与$\color{red}{报文首部}$,响应报文首部由：

- 状态行
- 响应首部字段

其中状态行

```
HTTP-Version Status-Code Reason-Phrase CRLF
如：
HTTP/1.1 200 OK
```

- HTTP-Version 服务器 HTTP 协议的版本
- Status-Code 服务器发回的响应状态代码
- Reason-Phrase 状态代码的文本描述

_状态码类型：_

| 状态码 |                含义                |
| ------ | :--------------------------------: |
| 1xx    | 指示信息--表示请求已接收，继续处理 |
| 2xx    |           客户端请求成功           |
| 3xx    |               重定向               |
| 4xx    |             客户端错误             |
| 5xx    |             服务端错误             |

**\*注意：** 很多人奇怪 404，明明是服务器地址不存在，为什么是客户端错，4xx 错误是指请求有语法错误或请求无法实现

_常见状态：_

- 200 OK：客户端请求成功。
- 204 Not Content：正常响应，没有实体。
- 304 Not Modified: 状态未改变 配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since)
- 400 Bad Request：客户端请求有语法错误，不能被服务器所理解。
- 401 Unauthorized：请求未经授权，这个状态代码必须和 WWW-Authenticate 报头域一起使用。
- 403 Forbidden：服务器收到请求，但是拒绝提供服务。
- 404 Not Found：请求资源不存在，举个例子：输入了错误的 URL。
- 500 Internal Server Error：服务器发生不可预期的错误。
- 503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常

_响应请求首部_

分为：

- 通用首部(General Header)
- 响应首部(Response Header)
- 实体首部(Entity Header Fields)

下篇文章中将详细分析 HTTP 报文的首部字段.

详细报文内容请阅读 [HTTP 请求报文和 HTTP 响应报文](https://www.cnblogs.com/biyeymyhjob/archive/2012/07/28/2612910.html) 和 [HTTP 协议－HTTP 响应报文](https://juejin.im/post/6844903593116434439)

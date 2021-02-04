# Performance

### 一、简介

Web 性能是客观的衡量标准，是用户对加载时间和运行时的直观体验。Web 性能指页面加载到可交互和可响应所消耗的时间，以及页面在交互时的流畅度——滚动是否顺滑？按钮能否点击？弹窗能否快速打开，动画是否平滑？Web 性能既包括客观的度量如加载时间，每秒帧数和到页面可交互的时间；也包括用户的对页面内容加载时间的主观感觉。

### 二、关键性能指南

- CSS and JavaScript animation performance

  > Browsers are able to optimize rendering flows. In summary, we should always try to create our animations using CSS transitions/animations where possible. If your animations are really complex, you may have to rely on JavaScript-based animations instead.

- dns-prefetch
  当浏览器从第三方服务跨域请求资源的时候，在浏览器发起请求之前，这个第三方的跨域域名需要被解析为一个 IP 地址，这个过程就是 DNS 解析，DNS 缓存可以用来减少这个过程的耗时，DNS 解析可能会增加请求的延迟，对于那些需要请求许多第三方的资源的网站而言，DNS 解析的耗时延迟可能会大大降低网页加载性能。

- 优化启动性能
  不论在什么平台上，尽可能快地启动总是一个好主意。因为这是个很宽泛的问题，在这里我们不会着重关注。相反我们会关注构建 Web 应用时更重要的一个问题：尽可能异步地启动。这意味着不要将你所有的启动代码在应用主线程中的唯一一个事件处理函数中运行。

- 关键渲染路径
  关键渲染路径是指浏览器通过把 HTML、CSS 和 JavaScript 转化成屏幕上的像素的步骤顺序。优化关键渲染路径可以提高渲染性能。关键渲染路径包含了 Document Object Model (DOM)，CSS Object Model (CSSOM)，渲染树和布局。

### 三、 使用 Performance API

#### Performance API

Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。该类型的对象可以通过调用只读属性 Window.performance 来获得。

##### 属性

- Performance.navigation

PerformanceNavigation 对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等.

包含属性：

```
type：表示是如何导航到这个页面的

1:点击刷新页面按钮或者通过Location.reload()方法显示的页面

0:当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址

2:页面通过历史记录和前进后退访问时

255:任何其他方式

redirectCount:表示在到达这个页面之前重定向了多少次

```

- Performance.timing

PerformanceTiming 对象包含延迟相关的性能信息

包含属性：

```
navigationStart:从同一个浏览器上下文的上一个文档卸载(unload)结束时的UNIX时间戳。如果没有上一个文档，这个值会和PerformanceTiming.fetchStart相同;

unloadEventStart:unload事件抛出时的UNIX时间戳。如果没有上一个文档这个值会返回0

redirectStart:第一个HTTP重定向开始时的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.

redirectEnd :最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0;

fetchStart:浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前;

domainLookupStart:表征了域名查询开始的UNIX时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致;

domainLookupEnd:表征了域名查询结束的UNIX时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart一致

connectStart:返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

更多属性查阅：https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming

```

- performance.memory

Chrome 添加的一个非标准扩展，这个属性提供了一个可以获取到基本内存使用情况的对象

包含属性：

```
jsHeapSizeLimit：The maximum size of the heap, in bytes, that is available to the context.

totalJSHeapSize：The total allocated heap size, in bytes.

usedJSHeapSize：The currently active segment of JS heap, in bytes.


```

- Performance.timeOrigin

返回一个表示 the performance measurement 开始时间的高精度 timestamp

##### 方法

```

- Performance.clearMarks()
  将给定的 mark 从浏览器的性能输入缓冲区中移除。

- Performance.clearMeasures()
  将给定的 measure 从浏览器的性能输入缓冲区中移除。

- Performance.clearResourceTimings()
  从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的 performance entries。

- Performance.getEntries()
  基于给定的 filter 返回一个 PerformanceEntry 对象的列表。

- Performance.getEntriesByName()
  基于给定的 name 和 entry type 返回一个 PerformanceEntry 对象的列表。

- Performance.getEntriesByType()
  基于给定的 entry type 返回一个 PerformanceEntry 对象的列表

- Performance.mark()
  根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的 timestamp

- Performance.measure()
  在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp

- Performance.now()
  返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp

- Performance.setResourceTimingBufferSize()
  将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量
- Performance.toJSON()
  其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象


```

##### 使用例子

- 计算资源加载各阶段的时间

重定向 (redirectStart 和 redirectEnd )，DNS 查询(domainLookupStart 和 domainLookupEnd)，TCP 握手 (connectStart 和 connectEnd)， 响应 (responseStart 和 responseEnd)。 这段例子也计算了从开始获取资源和请求开始（分别为 fetchStart and requestStart）到响应结束 (responseEnd) 的时间

```
function calculate_load_times() {
  // Check performance support
  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported");
    return;
  }

  // Get a list of "resource" performance entries
  var resources = performance.getEntriesByType("resource");
  if (resources === undefined || resources.length <= 0) {
    console.log("= Calculate Load Times: there are NO `resource` performance records");
    return;
  }

  console.log("= Calculate Load Times");
  for (var i=0; i < resources.length; i++) {
    console.log("== Resource[" + i + "] - " + resources[i].name);
    // Redirect time
    var t = resources[i].redirectEnd - resources[i].redirectStart;
    console.log("... Redirect time = " + t);

    // DNS time
    t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
    console.log("... DNS lookup time = " + t);

    // TCP handshake time
    t = resources[i].connectEnd - resources[i].connectStart;
    console.log("... TCP time = " + t);

    // Secure connection time
    t = (resources[i].secureConnectionStart > 0) ? (resources[i].connectEnd - resources[i].secureConnectionStart) : "0";
    console.log("... Secure connection time = " + t);

    // Response time
    t = resources[i].responseEnd - resources[i].responseStart;
    console.log("... Response time = " + t);

    // Fetch until response end
    t = (resources[i].fetchStart > 0) ? (resources[i].responseEnd - resources[i].fetchStart) : "0";
    console.log("... Fetch until response end time = " + t);

    // Request start until reponse end
    t = (resources[i].requestStart > 0) ? (resources[i].responseEnd - resources[i].requestStart) : "0";
    console.log("... Request start until response end time = " + t);

    // Start until reponse end
    t = (resources[i].startTime > 0) ? (resources[i].responseEnd - resources[i].startTime) : "0";
    console.log("... Start until response end time = " + t);
  }
}

```

- 计算资源大小

```
function display_size_data(){
  // Check for support of the PerformanceResourceTiming.*size properties and print their values
  // if supported.
  if (performance === undefined) {
    console.log("= Display Size Data: performance NOT supported");
    return;
  }

  var list = performance.getEntriesByType("resource");
  if (list === undefined) {
    console.log("= Display Size Data: performance.getEntriesByType() is  NOT supported");
    return;
  }

  // For each "resource", display its *Size property values
  console.log("= Display Size Data");
  for (var i=0; i < list.length; i++) {
    console.log("== Resource[" + i + "] - " + list[i].name);
    if ("decodedBodySize" in list[i])
      console.log("... decodedBodySize[" + i + "] = " + list[i].decodedBodySize);
    else
      console.log("... decodedBodySize[" + i + "] = NOT supported");

    if ("encodedBodySize" in list[i])
      console.log("... encodedBodySize[" + i + "] = " + list[i].encodedBodySize);
    else
      console.log("... encodedBodySize[" + i + "] = NOT supported");

    if ("transferSize" in list[i])
      console.log("... transferSize[" + i + "] = " + list[i].transferSize);
    else
      console.log("... transferSize[" + i + "] = NOT supported");
  }
}
```

- 测量执行性能

```
// 标记一个开始点
performance.mark("mySetTimeout-start");

// 等待1000ms
setTimeout(function() {
  // 标记一个结束点
  performance.mark("mySetTimeout-end");

  // 标记开始点和结束点之间的时间戳
  performance.measure(
    "mySetTimeout",
    "mySetTimeout-start",
    "mySetTimeout-end"
  );

  // 获取所有名称为mySetTimeout的measures
  var measures = performance.getEntriesByName("mySetTimeout");
  var measure = measures[0];
  console.log("setTimeout milliseconds:", measure.duration)

  // 清除标记
  performance.clearMarks();
  performance.clearMeasures();
}, 1000);
```

### 分享文章

[使用 JavaScript 跟踪 Web 应用程序的性能](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651243692&idx=2&sn=7a74a4dd100381948bbcf0bc8f5ed337&chksm=bd491d288a3e943efd9bb05d0b5909f90dc5623103a0c43cecaa1ffba5372ebb2eb5e7b6fcf3&scene=27#wechat_redirect)

[Performance — 前端性能监控利器](https://www.cnblogs.com/bldxh/p/6857324.html)

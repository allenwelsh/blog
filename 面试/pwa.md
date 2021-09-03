### 离线化

#### 1、Web Worker 与 Service Worker 区别

Web Worker 和 Service Worker 都是 worker，一个 worker 是一个脚本在浏览器主线程之外的单独的线程上运行，
Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信

- Web Worker：web worker 可以用于减少主线程上大量的线程活动，web worker 特点：
  - 同源限制：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源
  - 通信：Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
  - 脚本执行：Worker 线程不能执行 alert()方法和 confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求

```js
//main.js

if (window.Worker) {
  var myWorker = new Worker("webworker.js");
  myWorker.postMessage("发送消息");
  myWorker.onmessage = (e) => {
    console.log(e.data);
    // myWorker.terminate();
  };
}

//webworker.js
self.onmessage = function (e) {
  console.log(e.data);
  // 向主文件发送信息
  self.postMessage("从到主");
};
```

#### 2、PWA

##### 实现目标：

- 离线环境可以使用
- 可以安装到桌面、可以搜索应用（manifest）
- 可以接收消息
- 可以使用 divice api

##### 核心技术：

- Web App Manifest：主要是一个 JSON 文件：manifest.json，开发者可以在这个 JSON 文件中配置 PWA 的相关信息，应用名称、图标、启动方式、背景颜色、主题颜色等等
- Service Worker：提供离线服务（缓存）、接收消息
- 离线通知：离线通知是指在用户没有打开 PWA 站点的情况下，也能接受到服务器推送过来的通知并展现给用户，其中包括了两部分，离线推送和展现通知，分别是 Web Push 和 Notification API
- App Shell 和骨架屏：App Shell 是 PWA 界面展示所需的最小资源集合，即让页面能够正常运行起来的最小的 HTML、CSS 和 JavaScript 等静态资源集，每个页面都需要加载这一部分资源

PWA 的关键技术在浏览器中的支持度如下：

- Web App Manifest 的支持度达到 80.63%。
- Service Worker 的支持度达到 89.84%。
- Notifications API 的支持度达到 75.17%。
- Push API 的支持度达到 78.06%。

#### 相关文章

[pwa](https://lavas-project.github.io/pwa-book/)
[worker 区别](https://tinyshare.cn/post/HpDVBvTWbUD)
[web worker](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)

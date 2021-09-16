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

##### Manifest

它们是可以安装到设备的主屏幕的网络应用程序，而不需要用户通过应用商店，伴随着其他功能, 比如离线可用和接收推送通知

```js
<link rel="manifest" href="/manifest.json">


{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "web"
  }, {
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```

##### App Shell

App Shell 是页面能够展现所需的最小资源集合，即支持用户界面所需的最小的 HTML、CSS 和 JavaScript 等静态资源集合，搭配 Service Worker 使用

##### 骨架屏

实现方式：
1、手写 html 和 css 代码；
2、使用 svg 的 base64 图片
3、使用插件

优化方式：
link 的 prefetch，在资源加载完成时候触发 js 挂载

##### Cache API

Cache 对象提供了 put()、add()、addAll() 三个方法来添加或者覆盖资源请求响应的缓存

- 清除缓存

```js
// 激活时删除旧的缓存
self.addEventListener("activate", async (event) => {
  // 获取所有cache的key
  const keys = await caches.keys();
  keys.forEach((key) => {
    // 如果cache的名字和当前名字不同
    // 就将该cache删除
    if (key !== CACHE_NAME) {
      caches.delete(key);
    }
  });
  await self.clients.claim();
});
```

```js
this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll([
        "/sw-test/",
        "/sw-test/index.html",
        "/sw-test/style.css",
        "/sw-test/app.js",
        "/sw-test/image-list.js",
        "/sw-test/star-wars-logo.jpg",
        "/sw-test/gallery/bountyHunters.jpg",
        "/sw-test/gallery/myLittleVader.jpg",
        "/sw-test/gallery/snowTroopers.jpg",
      ]);
    })
  );
});

this.addEventListener("fetch", function (event) {
  var response;
  event.respondWith(
    caches
      .match(event.request)
      .catch(function () {
        return fetch(event.request);
      })
      .then(function (r) {
        response = r;
        caches.open("v1").then(function (cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      })
      .catch(function () {
        return caches.match("/sw-test/gallery/myLittleVader.jpg");
      })
  );
});

async function getData() {
  const cacheVersion = 1;
  const cacheName = `myapp-${cacheVersion}`;
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    console.log("检索缓存的数据");
    return cachedData;
  }

  console.log("获取新数据");

  const cacheStorage = await caches.open(cacheName);
  await cacheStorage.add(url);
  cachedData = await getCachedData(cacheName, url);
  await deleteOldCaches(cacheName);

  return cachedData;
}

// 从缓存中获取数据。
async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
}

// 删除任何旧的缓存，给用户留出磁盘空间。
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  for (const key of keys) {
    const isOurCache = "myapp-" === key.substr(0, 6);

    if (currentCache === key || !isOurCache) {
      continue;
    }

    caches.delete(key);
  }
}

try {
  const data = await getData();
  console.log({ data });
} catch (error) {
  console.error({ error });
}
```

##### FCP 优化原则

- 加速或减少 HTTP 请求损耗：使用 CDN 加载公用库，使用强缓存和协商缓存，使用域名收敛，小图片使用 Base64 代替，使用 Get 请求代替 Post 请求，设置 Access-Control-Max-Age 减少预检请求，页面内跳转其他域名或请求其他域名的资源时使用浏览器 prefetch 预解析等；
- 延迟加载：非重要的库、非首屏图片延迟加载，SPA 的组件懒加载等；
- 减少请求内容的体积：开启服务器 Gzip 压缩，JS、CSS 文件压缩合并，减少 cookies 大小，SSR 直接输出渲染后的 HTML 等；
- 浏览器渲染原理：优化关键渲染路径，尽可能减少阻塞渲染的 JS、CSS；
- 优化用户等待体验：白屏使用加载进度条、菊花图、骨架屏代替等；

##### Service Worker

- Service Worker 可以独立于浏览器在后台运行，控制我们的一个或者多个页面。如果我们的页面在多个窗口中打开，Service Worker 不会重复创建。
- 传 scope 选项，scope 的值，必须是 Service Worker 所在目录或者是子目录

```js
//容错方案 ，关闭sw
if ("serviceWorker" in navigator) {
  // 正常进行注册 Service Worker
  navigator.serviceWorker.register("./sw.js?v=20190401235959");
  let script = document.createElement("script");
  // 假设这个 JS 中存在 Service Worker 开关全局变量
  script.src = "https://some-static-cdn-host/sw-on-off.js";
  script.async = true;
  script.onload = () => {
    // Service Worker 开关全局变量的名称
    if (window.SW_TURN_OFF) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (let reg of regs) {
          // 注销掉所有的 Service Worker
          reg.unregister();
        }
      });
    }
  };
  document.body.appendChild(script);
}
```

#### 相关文章

[pwa](https://lavas-project.github.io/pwa-book/)
[worker 区别](https://tinyshare.cn/post/HpDVBvTWbUD)
[web worker](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)
[骨架屏幕](https://juejin.cn/post/6844903661726859272)
[饿了么的 PWA 升级实践](https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/)
[为 vue 项目添加骨架屏](https://xiaoiver.github.io/coding/2017/07/30/%E4%B8%BAvue%E9%A1%B9%E7%9B%AE%E6%B7%BB%E5%8A%A0%E9%AA%A8%E6%9E%B6%E5%B1%8F.html)
[cache](https://blog.csdn.net/zemprogram/article/details/103001260)
[service worker](https://cloud.tencent.com/developer/article/1701998)
[sw 更新](https://juejin.cn/post/6844903792522035208)

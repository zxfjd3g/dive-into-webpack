### 使用 DevServer
在前面的几节中我们只是让 Webpack 正常运行起来了，但实际开发中你可能会需要：
1. 提供 HTTP 服务而不是使用本地文件预览
2. 监听文件变化自动刷新网页做到实时预览
3. 支持 Source Maps 方便调试

这些 Webpack 都为你考虑好了，Webpack 原生支持2、3两点，再结合官方提供的开发工具 [DevServer](https://webpack.js.org/configuration/dev-server/) 也可以很方便的做到第1点。
DevServer 会启动一个 HTTP 服务器用于服务网页请求，同时还会帮我们启动 Webpack 并接受来自 Webpack 发出的文件更变信号通过 WebSocket 协议自动刷新网页做到实时预览。
下面我们来为之前的小项目 `Hello,Webpack` 继续集成 DevServer。
首先我们需要安装 DevServer：
```bash
npm i -D webpack-dev-server
```
成功后执行 `webpack-dev-server` 命令就启动了，这时你会看到控制台有一串日志输出：
```
Project is running at http://localhost:8080/
webpack output is served from /
```
这意味着 DevServer 启动的 HTTP 服务器监听在 `http://localhost:8080/` ，DevServer 启动后会一直驻留在后台保持运行，访问这个网址你就能获取到项目根目录下的 `index.html`，用浏览器打开这个地址你会发现页面空白错误原因是 `./dist/bundle.js` 加载404了。
同时你还会发现并没有文件输出到 `dist` 目录，原因是 DevServer 会把 Webpack 构建出的文件保存在内存里，要访问输出的文件你必须通过 HTTP 服务访问。
由于 DevServer 不会理会 `webpack.config.js` 里配置的 `output.path` 属性，所以要获取 `bundle.js` 的正确 URL 是 `http://localhost:8080/bundle.js`，对应的 `index.html` 应该修改为：
```html
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
<h1 id="app"></h1>
<!--导入 DevServer 输出的 JS 文件-->
<script src="bundle.js"></script>
</body>
</html>
```

#### 实时预览
接着上面的步骤，你可以试试修改 `main.js main.css show.js` 中的任何一个文件，保存后你会发现浏览器会被自动刷新运行出修改后的效果。

Webpack 在启动时可以开启监听模式，开启监听模式后 Webpack 会监听本地文件系统的变化，发生变化时重新构建出新的结果，Webpack 默认是关闭监听模式的，你可以在启动 Webpack 时通过 `webpack --watch` 来开启监听模式。

通过 DevServer 启动的 Webpack 会开启监听模式，当发生变化时重新执行完构建后通知 DevServer。
DevServer 会让 Webpack 在构建出的 JavaScript 代码里注入一个客户端用于控制网页，网页和 DevServer 直接的通信是通过 WebSocket 协议，以方便 DevServer 主动给客户端发命令。
DevServer 在收到来自 Webpack 的文件变化通知时通过注入的客户端控制网页刷新。

如果你试试修改 `index.html` 文件保存后，并不会触发以上机制，导致这个问题的原因是 Webpack 在启动时会以配置里的 `entry` 为入口去递归解析出 `entry` 所依赖的文件，只有 `entry` 本身和依赖的文件才会被 Webpack 添加到监听列表里去。
而 `index.html` 文件是脱离了 JavaScript 模块化系统的，所以 Webpack 不知道它的存在。

##### 模块热替换
除了通过重新刷新整个网页来实现实时预览外，DevServer 还有一种被称作模块热替换的刷新技术。
模块热替换能做到在不重新加载整个网页的情况下，通过把被更新过的模块替换掉老的后去重新执行一次来实现实时预览。
模块热替换相比于默认的刷新机制能提供更快的响应和更好的开发体验。
模块热替换默认是关闭的，要开启模块热替换你只需在启动 DevServer 时带上 `--hot` 参数，重新 DevServer 后你再去更新文件就能体验到模块热替换的神奇了。

#### 支持 Source Maps
在浏览器加载运行的 JavaScript 代码都是经过处理后的代码，这些代码可读性很差。如果你在开发过程中遇到一个不知道原因的 Bug，你可能需要通过断点调试去找出问题。
在经过处理后的代码上进行断点调试时一件辛苦和不优雅的事情，调试工具可以通过 [Source Maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) 映射代码，让你在源代码上断点调试。
Webpack 支持生成 Source Maps，只需在启动时带上 `--devtool source-map` 参数即可。
加上参数重启上面的 DevServer 后刷新页面，再打开 Chrome 浏览器的开发者工具，就可在 Sources 栏中看到可调试的源代码了。

![source-map](img/source-map.png)

**本实例[完整代码下载](https://github.com/gwuhaolin/dive-into-webpack/tree/master/codes/使用DevServer)**
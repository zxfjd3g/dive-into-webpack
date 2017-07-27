### 使用 DevServer
在前面的几节中我们只是让 Webpack 正常运行起来了，但实际开发中你可能会需要：
1. 提供 HTTP 服务而不是使用本地文件预览
2. 监听文件变化自动刷新网页做到实时预览
3. 支持 source-map 方便调试

这些 Webpack 都为你考虑好了，Webpack 原生支持2、3两点，再结合官方提供的开发工具 [DevServer](https://webpack.js.org/configuration/dev-server/) 可以很方便的做到第1点。
DevServer 会启动一个 HTTP 服务器用于服务网页请求，同时还会帮我们启动 Webpack 接受来自 Webpack 发出的文件更变信号通过 WebSocket 协议自动刷新网页做到实时预览。
下面我们来为之前的小项目 `Hello,Webpack` 继续集成 DevServer。
首先我们需要安装 DevServer：
```bash
npm i -D webpack-dev-server
```
成功后执行 `webpack-dev-server` 命令就启动了，这是你会看到一串日志输出：
```
Project is running at http://localhost:8080/
webpack output is served from /
```
这意味着 DevServer 启动的 HTTP 服务器服务在 `http://localhost:8080/` 访问这个网址你就能获取到项目根目录下的 `index.html`，用浏览器打开这个地址你会发现 `./dist/bundle.js` 加载404了，原因是输出到内存的 `bundle.js`

启动后你会发现并没有文件输出到 `dist` 目录，原因是 DevServer 会把 Webpack 构建出的文件保存在内存里，要访问输出的文件你必须通过 HTTP 服务访问。
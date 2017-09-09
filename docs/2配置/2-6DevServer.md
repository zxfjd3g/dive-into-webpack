### devServer
[1-6 使用DevServer](../1入门/1-6使用DevServer.md)介绍过用来提高开发效率的 DevServer ，它提供了一些配置项可以改变 DevServer 的默认行为。
要配置 DevServer ，除了在配置文件里通过 `devServer` 传入参数外，还可以通过命令行参数传入。
注意只有在通过 DevServer 去启动 Webpack 时配置文件里 `devServer` 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 `devServer` 配置项。

#### hot
`devServer.hot` 配置是否启用[1-6 使用DevServer](../1入门/1-6使用DevServer.md#模块热替换)中提到的模块热替换功能。
DevServer 默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。


#### inline
DevServer 的实时预览功能依赖一个注入到页面里的代理客户端去接受来自 DevServer 的命令和负责刷新网页的工作。
`devServer.inline` 用于配置是否自动注入这个代理客户端到将运行在页面里的 Chunk 里去，默认是会自动注入。
DevServer 会根据你是否开启 `inline` 来调整它的自动刷新策略：

- 如果开启 `inline`，DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷新。
- 如果关闭 `inline`，DevServer 将无法直接控制要开发的网页。这时它会通过 iframe 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 iframe 来实现实时预览。
但这时你需要去 `http://localhost:8080/webpack-dev-server/` 实时预览你的网页了。

如果你想使用 DevServer 的模块热替换机制去实现实时预览，最方便的方法是直接开启 `inline`。


#### historyApiFallback
`devServer.historyApiFallback` 用于方便的开发使用了 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 的单页应用。
这类单页应用要求服务器在针对任何命中的路由时都返回一个对应的 HTML 文件，例如在访问 `http://localhost/user` 和 `http://localhost/home` 时都返回 `index.html` 文件，
浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。

配置 `historyApiFallback` 最简单的做法是：
```js
historyApiFallback: true
```
这会导致任何请求都会返回 `index.html` 文件，这只能用于只有一个 HTML 文件的应用。

如果你的应用由多个单页应用组成，这就需要 DevServer 根据不同的请求来返回不同的 HTML 文件，配置如下：
```js
historyApiFallback: {
  // 使用正则匹配命中路由
  rewrites: [
    // /user 开头的都返回 user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // 其它的都返回 index.html
    { from: /./, to: '/index.html' },
  ]
}
```

#### contentBase
`devServer.contentBase` 配置 DevServer HTTP 服务器的文件根目录。
默认情况下为当前执行目录，通常是项目根目录，所有一般情况下你不必设置它，除非你有额外的文件需要被 DevServer 服务。
例如你想把项目根目录下的 `public` 目录设置成 DevServer 服务器的文件根目录，你可以这样配置：
```js
devServer:{
  contentBase: path.join(__dirname, 'public')
}
```

这里需要指出可能会让你疑惑的地方，DevServer 服务器通过 HTTP 服务暴露出的文件分为两类：

- 暴露本地文件。
- 暴露 Webpack 构建出的结果，由于构建出的结果交给了 DevServer，所以你在使用了 DevServer 时在本地找不到构建出的文件。

`contentBase` 只能用来配置暴露本地文件的规则，你可以通过 `contentBase:false` 来关闭暴露本地文件。


#### headers
`devServer.headers` 配置项可以在 HTTP 响应中注入一些 HTTP 响应头，使用如下：
```js
devServer:{
  headers: {
    'X-foo':'bar'
  }
}
```


#### host
`devServer.host` 配置项用于配置 DevServer 服务监听的地址，只能通过命令行参数传入。
例如你想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 `--host 0.0.0.0`。
`host` 的默认值是 `127.0.0.1` 即只有本地可以访问 DevServer 的 HTTP 服务。


#### port
`devServer.host` 配置项用于配置 DevServer 服务监听的端口，默认使用 8080 端口。
如果 8080 端口已经被其它程序占有就使用 8081，如果 8081 还是被占用就使用 8082，以此类推。

#### allowedHosts
`devServer.allowedHosts` 配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回，使用如下：
```js
allowedHosts: [
  // 匹配单个域名
  'host.com',
  'sub.host.com',
  // host2.com 和所有的子域名 *.host2.com 都将匹配
  '.host2.com'
]
```


#### disableHostCheck
`devServer.disableHostCheck` 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。
DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。
它通常用于搭配 `--host 0.0.0.0` 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。


#### https
DevServer 默认使用 HTTP 协议服务，它也能通过 HTTPS 协议服务。
有些情况下你必须使用 HTTPS，例如 HTTP2 和 Service Worker 就必须运行在 HTTPS 之上。
要切换成 HTTPS 服务，最简单的方式是：
```js
devServer:{
  https: true
}
```
DevServer 会自动的为你生成一份 HTTPS 证书。

如果你想用自己的证书可以这样配置：
```js
devServer:{
  https: {
    key: fs.readFileSync('path/to/server.key'),
    cert: fs.readFileSync('path/to/server.crt'),
    ca: fs.readFileSync('path/to/ca.pem')
  }
}
```


#### clientLogLevel
`devServer.clientLogLevel` 配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容。
`clientLogLevel` 是枚举类型，可取如下之一的值 `none | error | warning | info`。
默认为 `info` 级别，即输出所有类型的日志，设置成 `none` 可以不输出任何日志。


#### compress
`devServer.compress` 配置是否启用 gzip 压缩。`boolean` 类型，默认 `false`。


#### open
`devServer.open` 用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。
同时还提供 `devServer.openPage` 配置项用于打开指定 URL 的网页。

### Fis3
[Fis3](https://fex.baidu.com/fis3/) 是一个来自百度的优秀国产构建工具。相比于 Grunt、Gulp 这些只提供基本功能的工具来说，Fis3 集成了 Web 开发中常用的构建功能，包括：
- 读写文件：通过 `fis.match` 读文件，`release` 配置文件输出路径
- 资源定位：解析文件之间的依赖关系和文件位置
- 文件指纹：通过 `useHash` 配置输出文件时给文件 URL 加上 md5 戳来优化浏览器缓存
- 文件编译：通过 `parser` 配置文件解析器来做文件转换，比如把 ES6 编译成 ES5
- 压缩资源：通过 `optimizer` 配置文件优化方法做代码压缩
- 图片合并：通过 `spriter` 配置合并 CSS 里导入的图片到一个文件减少 HTTP 请求数

大致使用如下：
```js
// 加 md5
fis.match('*.{js,css,png}', {
  useHash: true
});

fis.match('*.ts', {
  // fis3-parser-typescript 插件把 ts 转换成 js
  parser: fis.plugin('typescript')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
```

可以看出 Fis3 很强大，内置了许多功能无需做太多配置就能完成大量工作。

**优点是：**
- 集成各种 Web 开发所需的构建功能，配置简单开箱即用。

**缺点是：**
- 目前官方已经不再更新和维护，不支持最新版本的 Nodejs。

Fis3 是一个专注于 Web 开发的完整解决方案，如果把 Grunt、Gulp 比喻成汽车的发动机，Fis3 可比喻成一辆完成的汽车。
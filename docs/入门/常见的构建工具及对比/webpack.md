### Webpack
[Webpack](https://webpack.js.org) 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 loader 转换文件，通过 plugin 注入钩子，最后输出由多个模块组合成的文件。
大致使用如下：
```js
module.exports = {
  // 所有模块的入口，Webpack 从入口开始递归解析出所有依赖的模块
  entry: './app.js',
  output: {
    // 把入口所依赖的所有模块打包成一个文件 bundle.js 输出 
    filename: 'bundle.js'
  }
}
```

**优点是：**
- 专注于处理模块化的项目，能做到开箱即用一步到位
- 通过 plugin 扩展，完整好用又不失灵活
- 使用场景不仅限于 Web 开发
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展
- 良好的开发体验

**缺点是：**
- 只能用于采用模块化开发的项目

Webpack 专注于构建模块化项目，由于它是本书的主角后面再详细介绍。

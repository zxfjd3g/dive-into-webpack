### 使用 Plugin
Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。

在上一节中通过 Loader 加载了 CSS 文件，本节将通过 Plugin 把注入到 `bundle.js` 文件里的 CSS 提取到单独的文件中，配置修改如下：
```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 把输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};
```
要让以上代码运行起来，需要先安装新引入的插件：
```bash
npm i -D extract-text-webpack-plugin
```
安装成功后重新执行构建，你会发现 dist 目录下多出一个 `main_1a87a56a.css` 文件，`bundle.js` 里也没有 CSS 代码了，再把该 CSS 文件引入到 `index.html` 里就完成了。

从以上代码可以看出， Webpack 是通过 `plugins` 属性来配置需要使用的插件列表的。
`plugins` 属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

例如 `ExtractTextPlugin` 插件的作用是提取出 JavaScript 代码里的 CSS 到一个单独的文件。
对此你可以通过插件的 `filename` 属性，告诉插件输出的 CSS 文件名称是通过 `[name]_[contenthash:8].css` 字符串模版生成的，里面的 `[name]` 代表文件名称， `[contenthash:8]` 代表根据文件内容算出的8位 hash 值，
还有很多配置选项可以在 [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 的主页上查到。


> 本实例[提供项目完整代码](http://webpack.wuhaolin.cn/1-5使用Plugin.zip)

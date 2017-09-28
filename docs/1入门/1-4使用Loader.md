### 使用 Loader
在上一节中使用 Webpack 构建了一个采用 CommonJS 规范的模块化项目，本节将继续优化这个网页的 UI，为项目引入 CSS 代码让文字居中显示，`main.css` 的内容如下：
```css
#app{
  text-align: center;
}
```

Webpack 把一切文件看作模块，CSS 文件也不例外，要引入 `main.css` 需要像引入 JavaScript 文件那样，修改入口文件 `main.js` 如下：
```js
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack');
```
但是这样修改后去执行 Webpack 构建是会报错的，因为 Webpack 不原生支持解析 CSS 文件。要支持非 JavaScript 类型的文件，需要使用 Webpack 的 Loader 机制。Webpack的配置修改使用如下：
```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```
Loader 可以看作具有文件转换功能的翻译员，配置里的 `module.rules` 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。
如上配置告诉 Webpack 在遇到以 `.css` 结尾的文件时先使用 `css-loader` 读取 CSS 文件，再交给 `style-loader` 把 CSS 内容注入到 JavaScript 里。
在配置 Loader 时需要注意的是：

- `loaders` 属性需要传入一个数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 `css-loader?minimize` 中的 `minimize` 告诉 `css-loader` 要开启 CSS 压缩。

想知道Loader 具体支持哪些属性，则需要我们查阅文档，例如 `css-loader` 还有很多用法，我们可以在 [css-loader 主页](https://github.com/webpack-contrib/css-loader) 上查到。

在重新执行 Webpack 构建前要先安装新引入的 Loader：
```bash
npm i -D style-loader css-loader
```
安装成功后重新执行构建时，你会发现 `bundle.js` 文件被更新了，里面注入了在 `main.css` 中写的 CSS，而不是会额外生成一个 CSS 文件。
但是重新刷新 `index.html` 网页时将会发现 `Hello,Webpack` 居中了，样式生效了！
也许你会对此感到奇怪，第一次看到 CSS 被写在了 JavaScript 里！这其实都是 `style-loader` 的功劳，它的工作原理大概是把 CSS 内容用 JavaScript 里的字符串存储起来，在页面 JavaScript 执行后通过 DOM 操作动态地往 `HTML head` 标签里插入 `HTML style` 标签。
也许你认为这样做会导致 JavaScript 文件变大并导致加载网页时间变长，想让 Webpack 单独输出 CSS 文件。下一节[1-5 使用Plugin](1-5使用Plugin.md)将教你如何通过 Webpack Plugin 机制来实现。

> 本实例[提供项目完整代码](http://webpack.wuhaolin.cn/1-4使用Loader.zip)

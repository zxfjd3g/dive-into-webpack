### 使用 Plugin
Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。
在上一节中我们通过 Loader 加载了 CSS 文件，本节我们将通过 Plugin 把注入到 `bundle.js` 文件里的 CSS 提取到单独的文件中，配置修改如下：
```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // JS 执行入口文件
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
                // 用正则去匹配要用该 loader 转换的 css 文件
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`,
        }),
    ]
};
```
要让以上代码运行起来你要先安装新引入的插件：
```bash
npm i -D extract-text-webpack-plugin
```
安装成功后重新执行构建你会发现 dist 目录下多出一个 `main_16a1d978.css` 文件，`bundle.js` 里也没有 CSS 代码了，再把该文件引入到 `index.html` 里去就完成了。

从以上代码可以看出 Webpack 是通过 `plugins` 属性来配置需要使用的插件列表的，`plugins` 属性是一个数组里面的每一项是插件的一个实例，在实例化一个组件的时候可以通过构造函数传入这个组件支持的配置属性。
例如 `ExtractTextPlugin` 插件的作用是提取出 JS 代码里的 CSS 到一个单独的文件，
对此你可以通过插件的 `filename` 属性告诉插件输出的 CSS 文件名称规则是使用 `[name]_[contenthash:8].css` 字符串模版，里面的 `[name]` 代表文件名称 `[contenthash:8]` 代表根据文件内容算出的 hash 值前8位，
还有很多配置选项可以在 [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 的主页查到。


本实例[完整代码下载](https://github.com/gwuhaolin/dive-into-webpack/tree/master/codes/使用Plugin)

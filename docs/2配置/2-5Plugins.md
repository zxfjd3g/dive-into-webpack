### Plugin
Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。


#### 配置 Plugin
Plugin 的配置很简单，`plugins` 配置项接受一个数组，数组里每一项都是一个要使用的 Plugin 的实例，Plugin 需要的参数通过构造函数传入。
```js
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    // 所有页面都会用到的代码到 common
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),
  ]
};
```
使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如果在 Webpack 中接入 Plugin。

几乎所有 Webpack 无法直接实现的功能都能在社区找到开源的 Plugin 去解决，你需要善于使用搜索引擎去寻找解决问题的方法。

const path = require('path');

module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [path.resolve(__dirname, 'node_modules')],
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
};

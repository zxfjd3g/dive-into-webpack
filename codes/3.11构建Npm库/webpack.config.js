const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 模块的入口文件
  entry: './src/index.js',
  output: {
    // 输出文件的名称
    filename: 'index.js',
    // 输出文件的存放目录
    path: path.resolve(__dirname, 'lib'),
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
  // 这些模块使用外部的，不能被打包进输出的代码里
  externals: /^(react|babel-runtime)/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
  // 输出 Source Map
  devtool: 'source-map',
};

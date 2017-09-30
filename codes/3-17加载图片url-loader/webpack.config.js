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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 30Kb 以下的文件采用 url-loader
            limit: 1024 * 30,
            // 否则采用 file-loader
            fallback: 'file-loader',
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `bundle.css`,
    }),
  ]
};

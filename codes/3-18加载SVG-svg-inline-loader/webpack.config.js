const path = require('path');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // JS 执行入口文件
  entry: {
    main: './main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ]
  },
  plugins: [
    new WebPlugin({
      template: 'template.html',
      filename: 'index.html',
      requires: ['main']
    })
  ]
};

const path = require('path');

module.exports = {
  target: 'async-node',
  // JS 执行入口文件
  entry: ['./main.js', './show.js'],
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[hash].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),

  },
  devServer: {
    lazy: true,
    setup(app) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  },
  externals: {
    jquery: 'jQuery'
  }
};

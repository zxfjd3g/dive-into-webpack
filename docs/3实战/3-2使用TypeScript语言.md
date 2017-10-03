### 使用 TypeScript 语言


#### 认识 TypeScript
[TypeScript](http://www.typescriptlang.org) 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 语法的支持，但不支持新的 API。
目前没有任何环境支持运行原生的 TypeScript 代码，必须通过构建把它转换成 JavaScript 代码后才能运行。

改造下前面用过的例子 `Hello,Webpack`，用 TypeScript 重写 JavaScript。由于 TypeScript 是 JavaScript 的超集，直接把后缀 `.js` 改成 `.ts` 是可以的。
但为了体现出 TypeScript 的不同，我们重写 JavaScript 代码为如下，让它们更 "TypeScript" 点：
```typescript
// show.ts
// 操作 DOM 元素，把 content 显示到网页上
// 通过 ES6 模块规范导出 show 函数
// 给 show 函数增加类型检查 
export function show(content: string) {
  window.document.getElementById('app').innerText = 'Hello,' + content;
}
// main.ts
// 通过 ES6 模块规范导入 show 函数
import {show} from './show';
// 执行 show 函数
show('Webpack');
```

TypeScript 官方提供了能把 TypeScript 转换成 JavaScript 的编译器。
你需要在当前项目根目录下新建一个用于配置编译选项的 `tsconfig.json` 文件，编译器默认会读取和使用这个文件，配置文件内容大致如下：
```json
{
  "compilerOptions": {
    "module": "commonjs", // 编译出的代码采用的模块规范
    "target": "es5", // 编译出的代码采用 ES 的哪个版本
    "sourceMap": true // 输出 Source Map 方便调试
  },
  "exclude": [ // 不编译这些目录里的文件
    "node_modules"
  ]
}
```
通过 `npm install -g typescript` 安装编译器到全局后，你可以通过 `tsc hello.ts` 命令编译出 `hello.js` 和 `hello.js.map` 文件。


#### 集成 Webpack
要让 Webpack 支持 TypeScript，需要解决以下2个问题：

1. 通过 Loader 把 TypeScript 转换成 JavaScript。
2. Webpack 在寻找模块对应的文件时需要尝试 `ts` 后缀。

对于问题1，社区已经出现了几个可用的 Loader，推荐速度更快的 [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)。
对于问题2，根据[2-4 Resolve 中的 extensions](../2配置/2-4Resolve.md#extensions) 我们需要修改默认的 `resolve.extensions` 配置项。

综上，相关 Webpack 配置如下：
```js
const path = require('path');

module.exports = {
  // TS 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts 后缀的 TypeScript 源码文件
    extensions: ['.ts', '.js',...[]] 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

在运行构建前需要安装上面用到的依赖：
```bash
npm i -D typescript awesome-typescript-loader
```
安装成功后重新执行构建，你将会在 `dist` 目录看到输出的 JavaScript 文件 `bundle.js` 和对应的 Source Map 文件 `bundle.js.map`。
在浏览器里打开 `index.html` 页面后，来开发工具里可以看到和调试用 TypeScript 编写的源码。

> 本实例[提供项目完整代码](http://webpack.wuhaolin.cn/3-2使用TypeScript语言.zip)

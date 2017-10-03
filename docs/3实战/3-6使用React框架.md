### 使用 React 框架

#### React 语法特征
使用了 React 项目的代码特征有 JSX 和 Class 语法，例如：
```jsx
class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}
```
> 在使用了 React 的项目里 JSX 和 Class 语法并不是必须的，但使用新语法写出的代码看上去更优雅

其中 JSX 语法是无法在任何现有的 JavaScript 引擎中运行的，所以在构建过程中需要把源码转换成可以运行的代码，例如：
```jsx
// 原 JSX 语法代码
return <h1>Hello,Webpack</h1>

// 被转换成正常的 JavaScript 代码
return React.createElement('h1', null, 'Hello,Webpack')
```

目前 Babel 和 TypeScript 都提供了对 React 语法的支持，下面分别来介绍如何在使用 Babel 或 TypeScript 的项目中接入 React 框架。

#### React 与 Babel
要在使用 Babel 的项目中接入 React 框架是很简单的，只需要加入 React 所依赖的 Presets [babel-preset-react](https://babeljs.io/docs/plugins/preset-react/)。
接下来通过修改前面讲过的[3-1 使用 ES6 语言](3-1使用ES6语言.md)中的项目，为其接入 React 框架。

通过以下命令：
```bash
# 安装 React 基础依赖
npm i -D react react-dom
# 安装 babel 完成语法转换所需依赖
npm i -D babel-preset-react
```
安装新的依赖后，再修改 `.babelrc` 配置文件加入 React Presets
```json
"presets": [
    ...[],
    "react"
],
```
就完成了一切准备工作。

再修改 `main.js` 文件如下：
```jsx
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));
```
重新执行构建打开网页你将会发现由 React 渲染出来的 `Hello,Webpack`。

> 本实例[提供项目完整代码](http://webpack.wuhaolin.cn/3-6使用React框架Babel.zip)

-----

#### React 与 TypeScript
TypeScript 相比于 Babel 的优点在于它原生支持 JSX 语法，你不需要重新安装新的依赖，只需修改一行配置。
但 TypeScript 的不同在于：

- 使用了 JSX 语法的文件后缀必须是 `jsx`。
- 由于 React 不是采用 TypeScript 编写的，需要安装 `react` 和 `react-dom` 对应的 TypeScript 接口描述模块 `@types/react` 和 `@types/react-dom` 后才能通过编译。

接下来通过修改[3-2 使用 TypeScript 语言](3-2使用TypeScript语言.md)中讲过的的项目，为其接入 React 框架。
修改 TypeScript 编译器配置文件 `tsconfig.json` 增加对 JSX 语法的支持，如下：
```js
{
  "compilerOptions": {
    ...{},
    "jsx": "react" // 开启 jsx ，支持 React
  }
}
```
由于 `main.js` 文件中存在 JSX 语法，再把 `main.js` 文件重命名为 `main.jsx`，同时修改文件内容为在上面 *React 与 Babel* 里所采用的 React 代码。
同时为了让 Webpack 对项目里的 ts 与 tsx 原文件都采用 `awesome-typescript-loader` 去转换，
需要注意的是 Webpack Loader 配置的 `test` 选项需要匹配到 tsx 类型的文件，并且 `extensions` 中也要加上 `.tsx`，配置如下：
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
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件 
    extensions: ['.ts', '.tsx', '.js',...[]] 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```
通过
```bash
npm i react react-dom @types/react @types/react-dom
```
安装新的依赖后重启构建，重新打开网页你将会发现由 React 渲染出来的 `Hello,Webpack`。

> 本实例[提供项目完整代码](http://webpack.wuhaolin.cn/3-6使用React框架TypeScript.zip)

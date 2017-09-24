### 使用 Tree Sharking

#### 认识 Tree Sharking
Tree Sharking 可以用来剔除 JavaScript 中用不上的死代码。它依赖静态的 ES6 模块化语法，例如通过 `import` 和 `export` 导入导出。
Tree Sharking 最先在 Rollup 中出现，Webpack 在 2.0 版本中将其引入。

为了更直观的理解它，来看一个具体的例子。加入有一个文件 `util.js` 里存放很多工具函数和常量，在 `main.js` 中会导入和使用 `util.js`，代码如下：

`util.js` 源码：
```js
export function funcA() {
}

export function funB() {
}
```

`main.js` 源码：
```js
import {funcA} from './util.js';
funcA();
```

Tree Sharking 后的 `util.js`：
```js
export function funcA() {
}
```
由于只用到了 `util.js` 中的 `funcA`，所以剩下的都被 Tree Sharking 当作死代码给剔除了。

需要注意的是要让 Tree Sharking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的，
因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中），这让 Webpack 可以简单的分析出哪些 `export` 的被 `import` 过了。
如果你采用 ES5 中的模块化，例如 `module.export={...}`、`require(x+y)`、`if(x){require('./util')}`，Webpack 无法分析出哪些代码可以剔除。
 
#### 接入 Tree Sharking
上面讲了 Tree Sharking 是做什么的，接下来一步步教你如何配置 Webpack 让 Tree Sharking 生效。

首先，为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句，修改 `.babelrc` 文件为如下：
```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```
其中 `"modules": false` 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。

配置好 Babel 后，重新运行 Webpack，在启动 Webpack 时带上 `--display-used-exports` 参数

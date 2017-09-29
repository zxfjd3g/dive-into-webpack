### Output
`output` 配置如何输出最终想要的代码。`output` 是一个 `object`，里面包含一系列配置项，下面分别介绍它们。


#### filename
`output.filename` 配置输出文件的名称，为string 类型。
如果只有一个输出文件，则可以把它写成静态不变的：
```js
filename: 'bundle.js'
```
但是在有多个 Chunk 要输出时，就需要借助模版和变量了。前面说到 Webpack 会为每个 Chunk取一个名称，可以根据 Chunk 的名称来区分输出的文件名：
```js
filename: '[name].js'
```
代码里的 `[name]` 代表用内置的 `name` 变量去替换`[name]`，这时你可以把它看作一个字符串模块函数，
每个要输出的 Chunk 都会通过这个函数去拼接出输出的文件名称。

内置变量除了 `name` 还包括：

| 变量名 | 含义 |
| --- | --- |
| id | Chunk 的唯一标识，从0开始 |
| name | Chunk 的名称 |
| hash | Chunk 的唯一标识的 hash 值 |
| chunkhash | Chunk 内容的 hash 值 |

其中 `hash` 和 `chunkhash` 的长度是可指定的，`[hash:8]` 代表取8位 Hash 值，默认是20位。

> 注意 [ExtractTextWebpackPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 插件是使用 `contenthash` 来代表哈希值而不是 `chunkhash`，
> 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。

#### chunkFilename
`output.chunkFilename` 配置无入口的 Chunk 在输出时的文件名称。
chunkFilename 和上面的 filename 非常类似，但 chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。
常见的会在运行时生成 Chunk 场景有在使用 CommonChunkPlugin、使用 `import('path/to/module')` 动态加载等时。
chunkFilename 支持和 filename 一致的内置变量。

#### path
`output.path` 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 `path` 模块去获取绝对路径：
```js
path: path.resolve(__dirname, 'dist_[hash]')
```


#### publicPath
在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。

`output.publicPath` 配置发布到线上资源的 URL 前缀，为string 类型。
默认值是空字符串 `''`，即使用相对路径。

这样说可能有点抽象，举个例子，需要把构建出的资源文件上传到 CDN 服务上，以利于加快页面的打开速度。配置代码如下：
```js
filename:'[name]_[chunkhash:8].js'
publicPath: 'https://cdn.example.com/assets/'
```
这时发布到线上的 HTML 在引入 JavaScript 文件时就需要：
```html
<script src='https://cdn.example.com/assets/a_12345678.js'></script>
```

使用该配置项时要小心，稍有不慎将导致资源加载404错误。

`output.path` 和 `output.publicPath` 都支持字符串模版，内置变量只有一个：`hash` 代表一次编译操作的 hash 值。



#### crossOriginLoading
Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 [JSONP](https://zh.wikipedia.org/wiki/JSONP) 方式实现的。
JSONP 的原理是动态地向 HTML 中插入一个 `<script src="url"></script>` 标签去加载异步资源。 
`output.crossOriginLoading` 则是用于配置这个异步插入的标签的 `crossorigin` 值。

script 标签的 crossorigin 属性可以取以下值：

- `anonymous`(默认) 在加载此脚本资源时不会带上用户的 Cookies；
- `use-credentials` 在加载此脚本资源时会带上用户的 Cookies。

通常用设置 crossorigin 来获取异步加载的脚本执行时的详细错误信息。



#### libraryTarget 和 library
当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

- `output.libraryTarget` 配置以何种方式导出库。
- `output.library` 配置导出库的名称。

它们通常搭配在一起使用。

`output.libraryTarget` 是字符串的枚举类型，支持以下配置。

##### var (默认)
编写的库将通过 `var` 被赋值给通过 `library` 指定名称的变量。

假如配置了 `output.library='LibraryName'`，则输出和使用的代码如下：
```js
// Webpack 输出的代码
var LibraryName = lib_code;

// 使用库的方法
LibraryName.doSomething();
```

假如 `output.library` 为空，则将直接输出：
```js
lib_code
```
> 其中 `lib_code` 代指导出库的代码内容，是有返回值的一个自执行函数。

##### commonjs
编写的库将通过 CommonJS 规范导出。

假如配置了 `output.library='LibraryName'`，则输出和使用的代码如下：
```js
// Webpack 输出的代码
exports['LibraryName'] = lib_code;

// 使用库的方法
require('library-name-in-npm')['LibraryName'].doSomething();
```
> 其中 `library-name-in-npm` 是指模块发布到 Npm 代码仓库时的名称。

##### commonjs2
编写的库将通过 CommonJS2 规范导出，输出和使用的代码如下：
```js
// Webpack 输出的代码
module.exports = lib_code;

// 使用库的方法
require('library-name-in-npm').doSomething();
```
> CommonJS2 和 CommonJS 规范很相似，差别在于 CommonJS 只能用 `exports` 导出，而 CommonJS2 在 CommonJS 的基础上增加了 `module.exports` 的导出方式。
> 
> 在 `output.libraryTarget` 为 `commonjs2` 时，配置 `output.library` 将没有意义。

##### this
编写的库将通过 `this` 被赋值给通过 `library` 指定的名称，输出和使用的代码如下：
```js
// Webpack 输出的代码
this['LibraryName'] = lib_code;

// 使用库的方法
this.LibraryName.doSomething();
```

##### window
编写的库将通过 `window` 被赋值给通过 `library` 指定的名称，输出和使用的代码如下：
```js
// Webpack 输出的代码
window['LibraryName'] = lib_code;

// 使用库的方法
window.LibraryName.doSomething();
```

##### global
编写的库将通过 `window` 被赋值给通过 `library` 指定的名称，输出和使用的代码如下：
```js
// Webpack 输出的代码
global['LibraryName'] = lib_code;

// 使用库的方法
global.LibraryName.doSomething();
```

#### libraryExport
`output.libraryExport` 配置要导出的模块中哪些子模块需要被导出。
它只有在 `output.libraryTarget` 被设置成 `commonjs` 或者 `commonjs2` 时使用才有意义。

假如要导出的模块源代码是：
```js
export const a=1;
export default b=2;
```
现在你想让构建输出的代码只导出其中的 `a`，可以把 `output.libraryExport` 设置成 `a`，那么构建输出的代码和使用方法将变成如下：
```js
// Webpack 输出的代码
module.exports = lib_code['a'];

// 使用库的方法
require('library-name-in-npm')===1;
```


> 以上只是 `output` 里常用的配置项，还有部分几乎用不上的配置项没有一一列举，你可以在 [Webpack 官方文档](https://webpack.js.org/configuration/output/) 上查阅它们。

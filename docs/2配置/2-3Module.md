### Module
`module` 配置如何处理模块。


#### 配置 Loader
`rules` 配置模块的读取和解析规则，通常用来配置 Loader。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。
配置一项 `rules` 时大致通过以下方式：

1. 条件匹配：通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。
2. 应用规则：对选中后的文件通过 `use` 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。

下面来通过一个例子来说明具体使用方法：
```js
module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ['babel-loader?cacheDirectory'],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, 'src')
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ['file-loader'],
    },
  ]
}
```

在 Loader 需要传入很多参数时，你还可以通过一个 Object 来描述，例如在上面的 babel-loader 配置中有如下代码：
```js
use: [
  {
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    }
  },
  ...[]
]
```

上面的例子中 `test include exclude` 这三个命中文件的配置项只传入了一个字符串或正则，其实它们还都支持数组类型，使用如下：
```js
{
  test:[
    /\.jsx?$/,
    /\.tsx?$/
  ],
  include:[
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'tests'),
  ],
  exclude:[
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'bower_modules'),
  ]
}
```
数组里的每项之间是**或**的关系，即符合数组中的任何一个就会被命中。


#### noParse
`noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。
原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

`noParse` 是可选配置项，类型需要是 `RegExp | [RegExp] | function` 其中一个。

例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：
```js
// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
``` 
> 注意被忽略掉的文件里不应该包含 `import` 、 `require` 、 `define` 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。


#### parser
因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 `AMD CommonJS SystemJS ES6`。
`parser` 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 `noParse` 配置项的区别在于 `parser` 可以精确到语法层面，
而 `noParse` 只能控制哪些文件不被解析。
`parser` 使用如下：
```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES6 import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用 browserify
      requireJs: false, // 禁用 requirejs
      }
    },
  ]
}
```

### 配置 Webpack
配置 Webpack 的方式有两种：
1. 通过一个 JS 文件描述配置，例如使用 `webpack.config.js` 文件里的配置。
2. 执行 Webpack 可执行文件时通过命令参数传入，例如 `webpack --devtool source-map`。

这两种方式可以相互搭配，例如执行 Webpack 时用`webpack --config webpack-dev.config.js` 指定配置文件，再去 `webpack-dev.config.js` 里描述部分配置。

Webpack 的所有配置里有：
1. 只能通过命令行参数传入的选项，这种最为少见。
2. 只能通过配置文件配置的选项。
3. 两种方式都可以配置的选项。

接下来将一一说明所有 Webpack 提供的配置选项的含义和用法。

先来整体看下所有的配置：
```js
const path = require('path');

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array   
  entry: "./app/entry", 
  entry: ["./app/entry1", "./app/entry2"],
  entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },


  // 输出结果，在 Webpack 经过一系列处理出最终想要的代码后，如何输出它们。
  output: {
    // 输出文件存放的目录。必须是 string 类型的绝对路径  
    path: path.resolve(__dirname, "dist"),

    // 输出文件的名称
    filename: "bundle.js", // 完整的名称
    filename: "[name].js", // for multiple entry points
    filename: "[chunkhash].js", // for long term caching
    // the filename template for entry chunks

    publicPath: "/assets/", // string
    publicPath: "",
    publicPath: "https://cdn.example.com/",
    // the url to the output directory resolved relative to the HTML page

    library: "MyLibrary", // string,
    // the name of the exported library

    libraryTarget: "umd", // universal module definition
    libraryTarget: "umd2", // universal module definition
    libraryTarget: "commonjs2", // exported with module.exports
    libraryTarget: "commonjs", // exported as properties to exports
    libraryTarget: "amd", // defined with AMD defined method
    libraryTarget: "this", // property set on this
    libraryTarget: "var", // variable defined in root scope
    libraryTarget: "assign", // blind assignment
    libraryTarget: "window", // property set to window object
    libraryTarget: "global", // property set to global object
    libraryTarget: "jsonp", // jsonp wrapper
    // the type of the exported library

    /* Advanced output configuration (click to show) */

    pathinfo: true, // boolean
    // include useful path info about modules, exports, requests, etc. into the generated code

    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js", // for long term caching
    // the filename template for additional chunks

    jsonpFunction: "myWebpackJsonp", // string
    // name of the JSONP function used to load chunks

    sourceMapFilename: "[file].map", // string
    sourceMapFilename: "sourcemaps/[file].map", // string
    // the filename template of the source map location

    devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
    // the name template for modules in a devtool

    devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
    // the name template for modules in a devtool (used for conflicts)

    umdNamedDefine: true, // boolean
    // use a named AMD module in UMD library

    crossOriginLoading: "use-credentials", // enum
    crossOriginLoading: "anonymous",
    crossOriginLoading: false,
    // specifies how cross origin request are issued by the runtime

    /* Expert output configuration (on own risk) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        issuer: { test, include, exclude },
        // conditions for the issuer (the origin of the import)

        enforce: "pre",
        enforce: "post",
        // flags to apply these rules, even if they are overridden (advanced option)

        loader: "babel-loader",
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ["es2015"]
        },
        // options for the loader
      },

      {
        test: /\.html$/,

        use: [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },

      { oneOf: [ /* rules */ ] },
      // only use one of these nested rules

      { rules: [ /* rules */ ] },
      // use all of these nested rules (combine with conditions to be useful)

      { resource: { and: [ /* conditions */ ] } },
      // matches only if all conditions are matched

      { resource: { or: [ /* conditions */ ] } },
      { resource: [ /* conditions */ ] },
      // matches if any condition is matched (default for arrays)

      { resource: { not: [/* condition */] } }
      // matches if the condition is not matched
    ],

    /* Advanced module configuration (click to show) */

    noParse: [
      /special-library\.js$/
    ],
    // do not parse this module

    unknownContextRequest: ".",
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: ".",
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    // specifies default behavior for dynamic requests
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used

    alias: {
      // a list of module name aliases

      "module": "new-module",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

      "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"

      "module": path.resolve(__dirname, "app/third/module.js"),
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      // modules aliases are imported relative to the current context
    },
    /* alternative alias syntax (click to show) */
    alias: [
      {
        name: "module",
        // the old request

        alias: "new-module",
        // the new request

        onlyModule: true
        // if true only "module" is aliased
        // if false "module/inner/path" is also aliased
      }
    ],

    /* Advanced resolve configuration (click to show) */

    symlinks: true,
    // follow symlinks to new location

    descriptionFiles: ["package.json"],
    // files that are read for package description

    mainFields: ["main"],
    // properties that are read from description file
    // when a folder is requested

    aliasFields: ["browser"],
    // properites that are read from description file
    // to alias requests in this package

    enforceExtension: false,
    // if true request must not include an extensions
    // if false request may already include an extension

    moduleExtensions: ["-module"],
    enforceModuleExtension: false,
    // like extensions/enforceExtension but for module names instead of files

    unsafeCache: true,
    unsafeCache: {},
    // enables caching for resolved requests
    // this is unsafe as folder structure may change
    // but performance improvement is really big

    cachePredicate: (path, request) => true,
    // predicate function which selects requests for caching

    plugins: [
      // ...
    ]
    // additional plugins applied to the resolver
  },

  performance: {
    hints: "warning", // enum
    hints: "error", // emit errors for perf hints
    hints: false, // turn off perf hints
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: "source-map", // enum
  devtool: "inline-source-map", // inlines SourceMap into original file
  devtool: "eval-source-map", // inlines SourceMap per module
  devtool: "hidden-source-map", // SourceMap without reference in original file
  devtool: "cheap-source-map", // cheap-variant of SourceMap without module mappings
  devtool: "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
  devtool: "eval", // no SourceMap, but named modules. Fastest at the expense of detail.
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  target: "webworker", // WebWorker
  target: "node", // Node.js via require
  target: "async-node", // Node.js via fs and vm
  target: "node-webkit", // nw.js
  target: "electron-main", // electron, main process
  target: "electron-renderer", // electron, renderer process
  target: (compiler) => { /* ... */ }, // custom
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  externals: ["react", /^@angular\//],
  externals: "react", // string (exact match)
  externals: /^[a-z\-]+($|\/)/, // Regex
  externals: { // object
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  externals: (request) => { /* ... */ return "commonjs " + request }
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: "errors-only",
  stats: { //object
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
    // ...
  },
  // lets you precisely control what bundle information gets displayed

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  plugins: [
    // ...
  ],
  // list of additional plugins


  /* Advanced configuration (click to show) */

  resolveLoader: { /* same as resolve */ },
  // separate resolve options for loaders

  profile: true, // boolean
  // capture timing information

  bail: true, //boolean
  // fail out on the first error instead of tolerating it.

  cache: false, // boolean
  // disable/enable caching

  watch: true, // boolean
  // enables watching

  watchOptions: {
    aggregateTimeout: 1000, // in ms
    // aggregates multiple changes to a single rebuild

    poll: true,
    poll: 500, // intervall in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },

  node: {
    // Polyfills and mocks to run Node.js-
    // environment code in non-Node environments.

    console: false, // boolean | "mock"
    global: true, // boolean | "mock"
    process: true, // boolean
    __filename: "mock", // boolean | "mock"
    __dirname: "mock", // boolean | "mock"
    Buffer: true, // boolean | "mock"
    setImmediate: true // boolean | "mock" | "empty"
  },

  recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
  recordsOutputPath: path.resolve(__dirname, "build/records.json"),
}
```

### 配置
第1章只是粗略讲解了 Webpack 的基础核心功能，本章会列举 Webpack 的常用功能所提供的配置选项，可以作为速查表使用。

配置 Webpack 的方式有两种：

1. 通过一个 JavaScript 文件描述配置，例如使用 `webpack.config.js` 文件里的配置；
2. 执行 Webpack 可执行文件时通过命令行参数传入，例如 `webpack --devtool source-map`。

这两种方式可以相互搭配，例如执行 Webpack 时用`webpack --config webpack-dev.config.js` 指定配置文件，再去 `webpack-dev.config.js` 里描述部分配置。

按照**配置方式**来划分，可分为：

- 只能通过命令行参数传入的选项，这种最为少见；
- 只能通过配置文件配置的选项；
- 通过两种方式都可以配置的选项。

按照配置**所影响的功能**来划分，可分为：

- [2-1 Entry](2-1Entry.md) 配置模块的入口；
- [2-2 Output](2-2Output.md) 配置如何输出最终想要的代码；
- [2-3 Module](2-3Module.md) 配置模块相关；
- [2-4 Resolve](2-4Resolve.md) 配置寻找模块的规则；
- [2-5 Plugins](2-5Plugins.md) 配置扩展插件；
- [2-6 DevServer](2-6DevServer.md) 配置 DevServer；
- [2-7 其它配置项](2-7其它配置项.md) 其它零散的配置项；
- [2-8 整体配置结构](2-8整体配置结构.md) 整体地描述各配置项的结构；
- [2-9 多种配置类型](2-9多种配置类型.md) 配置文件不止可以返回一个 Object，还有其他返回形式；
- [2-10 配置总结](2-10配置总结.md) 寻找配置 Webpack 的规律，减少思维负担。

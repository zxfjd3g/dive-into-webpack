### 使用 TypeScript 语言
[TypeScript](http://www.typescriptlang.org) 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。
目前没有任何环境支持运行原生的 TypeScript 代码，你必须在通过构建把它转换成 JavaScript 代码才能运行。

TypeScript 官方提供了能把 TypeScript 转换成 JavaScript 的编译器，在通过 `npm install -g typescript` 安装编译器到全局后，你可以通过 `tsc hello.ts` 命令编译出 `hello.js 和 hello.js.map` 文件。
你需要在当前项目根目录下新建一个用于配置编译选项的 `tsconfig.json` 文件，编译器默认会读取和使用这个文件，文件内容如下：
```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

在 Webpack 里，你需要通过 Loader 把 TypeScript 转换成 JavaScript。

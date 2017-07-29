### Npm Script
[Npm Script](https://docs.npmjs.com/misc/scripts) 是一个任务执行者。Npm 是在安装 Nodejs 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 `package.json` 文件里面使用 `scripts` 字段定义任务：
```json
{
  "scripts": {
    "dev": "node dev.js",
    "pub": "node build.js"
  }
}
```
里面的 `scripts` 字段是一个对象，每一个属性对应一段脚本，以上定义了两个任务 `dev` 和 `pub`。底层实现原理是通过调用 Shell 去运行脚本命令，比如执行 `npm run pub` 命令等同于执行命令 `node build.js`。

**优点是：**
- Npm 是内置的，无需安装其它的模块。

**缺点是：**
- 功能太简单，虽然提供了 `pre` 和 `post` 两个钩子，但不能方便地管理多个任务之间的依赖。



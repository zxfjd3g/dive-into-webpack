### 为单页应用生成 HTML
在[前面的章节中](使用React框架.md)，都一直是用最简单的 `Hello,Webpack` 作为例子让大家理解，这个例子里因为只输出了一个 `bundle.js` 文件，所以手写了一个 `index.html` 文件去引入这个 JS 文件，让应用运行起来。

在实际项目中远比这复杂，一个页面常常有很多资源要加载。接下来举一个实际应用，要求如下：
1. 项目采用 ES6 语言加 React 框架
2. 给页面加入 [Google Analytics](https://analytics.google.com/analytics/web/)，这部分代码需要 inline 进 HEAD 标签里去。
3. 给页面加入 [Disqus](https://disqus.com) 用户评论，这部分代码可以异步加载提升首屏加载速度。
4. 压缩和分离 JS 和 CSS 代码，提升加载速度。

如果你还采用手写 `index.html` 文件去完成以上要求，这就会使项目变得复杂、易错、难以维护。本节教你如何自动化的生成这个符合要求的 `index.html`。

在开始前先来看看该应用最终发布到线上的代码，
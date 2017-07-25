### Grunt
[Grunt](https://gruntjs.com) 和 Npm Script 类似，也是一个任务执行者。Grunt 提供大量插件封装了常见的任务，也能管理任务之间的依赖关系自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 `Gruntfile.js` 里，比如：
```js
module.exports = function(grunt) {
  // 所有插件的配置信息
  grunt.initConfig({
    // uglify 插件的配置信息
    uglify: {
        app_task: {
          files: {
            'build/app.min.js': ['lib/index.js', 'lib/test.js']
          }
        }
    },
    // watch 插件的配置信息
    watch: {
        another: {
            files: ['lib/*.js'],
        }
    }
  });

  // 告诉 grunt 我们将使用这些插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 告诉grunt当我们在终端中启动 grunt 时需要执行哪些任务
  grunt.registerTask('dev', ['uglify','watch']);
};
```
在项目根目录下执行命令 `grunt dev` 就会启动文件优化和自动刷新。

**优点是：**
- 灵活，它只负责执行你定义的任务
- 大量可复用插件封装好了常见的构建任务，无需自己实现构建代码

**缺点是：**
- 要写很多配置后才可以用，无法做到开箱即用

Grunt 可以看作是进化版的 Npm Script，它的诞生其实是为了解决 Npm Script 的缺点。

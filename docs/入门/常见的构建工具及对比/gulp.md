### Gulp
[Gulp](http://gulpjs.com) 是一个基于流的自动化构建工具。除了可以管理和执行任务外还支持监听文件、读写文件。Gulp 设计的非常简单只通过下面5个方法就可以胜任很多场景：
- 通过 `gulp.task` 去注册一个任务
- 通过 `gulp.run` 去执行任务
- 通过 `gulp.watch` 去监听文件变化
- 通过 `gulp.src` 去读取文件
- 通过 `gulp.dest` 去写文件

Gulp 最大的特点是引入了**流**的概念，同时提供一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下：
```js
// 引入 gulp
var gulp = require('gulp'); 
// 引入插件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 编译 Sass 任务
gulp.task('sass', function() {
    // 读取文件通过管道喂给插件
    gulp.src('./scss/*.scss')
        // sass 插件把 scss 文件编译成 css 文件
        .pipe(sass())
        // 输出文件
        .pipe(gulp.dest('./css'));
});

// 合并压缩 JS
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 监听文件变化
gulp.task('watch', function(){
    // 当 scss 文件被编辑时执行 sass 任务
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['scripts']);    
});
```

**优点是：**
- 好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用

**缺点是：**
- 和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用

Gulp 可以看作是 Grunt 的加强版，相比于 Grunt 它增加了监听文件、读写文件、流式处理的功能。
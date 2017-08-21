const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

// 编译 gitbook
execSync(`node ./node_modules/gitbook-cli/bin/gitbook.js build`);
// execSync(`node ./node_modules/gitbook-cli/bin/gitbook.js pdf ./ _book/dive_into_webpack.pdf`); // 生产 pdf
// execSync(`node ./node_modules/gitbook-cli/bin/gitbook.js epub ./ _book/dive_into_webpack.epub`); // 生产 epub
// execSync(`node ./node_modules/gitbook-cli/bin/gitbook.js mobi ./ _book/dive_into_webpack.mobi`); // 生产 mobi

// 合并 markdown 为一个文件
(() => {
  const indexPath = path.resolve(__dirname, './docs/SUMMARY.md');
  let str = fs.readFileSync(indexPath, {
    encoding: 'utf8',
  });
  let finds = str.match(/\(.+\.md\)/g);
  finds.forEach(mdPath => {
    mdPath = mdPath.substring(1, mdPath.length - 1);
    mdPath = path.resolve(path.dirname(indexPath), mdPath);
    if (fs.existsSync(mdPath)) {
      let org = fs.readFileSync(mdPath, {
        encoding: 'utf8',
      });
      str += org + '\n';
    }
  });
  fs.writeFileSync('./_book/dive_into_webpack.md', str);
})();

// 发布到 gh-pages
ghpages.publish('_book', function (err) {
  if (err) {
    console.error('发布到 gh-pages 失败，错误：', err);
  } else {
    console.info('发布到 gh-pages 成功');
  }
});

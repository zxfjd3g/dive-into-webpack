const { execSync } = require('child_process');
const ghpages = require('gh-pages');
// const { title } = require('./book.json');

execSync(`gitbook build`);
// execSync(`node ./node_modules/gitbook/bin/gitbook.js pdf _book/${title}.pdf`);
// execSync(`node ./node_modules/gitbook/bin/gitbook.js epub _book/${title}.epub`);
// execSync(`node ./node_modules/gitbook/bin/gitbook.js mobi _book/${title}.mobi`);

ghpages.publish('_book', function (err) {
    if (err) {
        console.error('发布到 gh-pages 失败，错误：', err);
    } else {
        console.info('发布到 gh-pages 成功');
    }
});
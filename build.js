const { execSync } = require('child_process');
const ghpages = require('gh-pages');

execSync(`node ./node_modules/gitbook-cli/bin/gitbook.js build`);

ghpages.publish('_book', function (err) {
    if (err) {
        console.error('发布到 gh-pages 失败，错误：', err);
    } else {
        console.info('发布到 gh-pages 成功');
    }
});
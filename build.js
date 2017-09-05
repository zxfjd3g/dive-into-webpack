'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// const ghpages = require('gh-pages');
const { name } = require('./package.json');

/********************************* 在线读者 ***********************************/

// 生成网页
execSync(`gitbook build`);
console.log('生成网页静态文件成功');

// zip所有项目代码
const codesDir = 'codes';
// zip单个项目代码
fs.readdirSync(codesDir).forEach(fileName => {
  execSync(`git archive --format=zip HEAD:${path.join(codesDir, fileName)} -o _book/${fileName}.zip`);
  console.log(`zip ${fileName} 项目代码`);
});

// 自定义域名
fs.writeFileSync(path.resolve('_book', 'CNAME'), 'webpack.wuhaolin.cn');

/********************************* 纸质读者 ***********************************/

// 合并 markdown 为一个文件
const entryPath = path.resolve(__dirname, 'docs/README.md');
const entryDir = path.dirname(entryPath);
let str = fs.readFileSync(entryPath, {
  encoding: 'utf8',
});
let oneMd = str + '\n';
str.replace(/\[.+]\((.+\.md)\)/g, (_, mdPath) => {
  mdPath = path.resolve(entryDir, mdPath);
  if (fs.existsSync(mdPath)) {
    let mdDir = path.dirname(mdPath);
    let content = fs.readFileSync(mdPath, {
      encoding: 'utf8',
    });
    // 提取出外链，链接用斜体
    content = content.replace(/\[(.+)]\((https?:\/\/.+)\)/g, '*$1($2)*');
    // 修正内链
    content = content.replace(/\[(.+)]\(((?!https?:\/\/).+)\)/g, (match, p1, p2) => {
      p2 = path.resolve(mdDir, p2);
      if (p2.match(/.+.md.*/)) {
        // 链接用斜体
        return `*${p1}*`;
      }
      return `[${p1}](${p2})`;
    });
    oneMd += content + '\n';
  }
});
fs.writeFileSync(`_book/${name}.md`, oneMd);
console.log('拼接完整 markdown');

// 生成 docx
execSync(`pandoc --standalone --data-dir docs --output _book/${name}.docx --from markdown --to docx _book/${name}.md`);
console.log('生成完整 docx');

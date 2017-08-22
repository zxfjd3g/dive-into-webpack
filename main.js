const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');
const { name } = require('./package.json');

/********************************* 纸质读者 ***********************************/

// 合并 markdown 为一个文件
const entryPath = path.resolve(__dirname, 'docs/README.md');
let str = fs.readFileSync(entryPath, {
  encoding: 'utf8',
}) + '\n';
let finds = str.match(/\(.+\.md\)/g);
finds.forEach(mdPath => {
  mdPath = mdPath.substring(1, mdPath.length - 1);
  mdPath = path.resolve(path.dirname(entryPath), mdPath);
  if (fs.existsSync(mdPath)) {
    let content = fs.readFileSync(mdPath, {
      encoding: 'utf8',
    });
    let links = content.match(/\[.+]\(https?:\/\/.+\)/g);
    str += content + '\n';
  }
});
fs.writeFileSync(`_book/${name}.md`, str);
console.log('生成完整 markdown');

// 生成 docx
execSync(`pandoc -o _book/${name}.docx -f markdown -t docx _book/${name}.md`);
console.log('生成完整 docx');

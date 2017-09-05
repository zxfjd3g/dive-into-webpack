require('./main.css');
// const runtime = require('serviceworker-webpack-plugin/lib/runtime');

if (navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded',function() {
    // 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
    navigator.serviceWorker.register('sw.js');
  });
}

// require('offline-plugin/runtime').install();
window.document.getElementById('app').innerText = 'Hello,Webpack';

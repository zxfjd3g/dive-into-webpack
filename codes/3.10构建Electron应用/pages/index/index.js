import React, { Component } from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';
import path from 'path';
import './index.css';

class App extends Component {

  // 在按钮被点击时
  handleBtnClick() {
    // 新窗口对应的页面的 URI 地址
    const modalPath = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
    // 新窗口的大小
    let win = new remote.BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () {
      // 窗口被关闭时清空资源
      win = null
    })
    // 加载网页
    win.loadURL(modalPath)
    // 显示窗口
    win.show()
  }

  render() {
    return (
      <div>
        <h1>Page Index</h1>
        <button onClick={this.handleBtnClick}>Open Page Login</button>
      </div>
    )
  }
}

render(<App/>, window.document.getElementById('app'));

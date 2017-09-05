import React, { Component } from 'react';
import './index.css';

// 导出该组件供给其它模块使用
export default class HelloWebpack extends Component {
  render() {
    return <h1 className="hello-component">Hello,Webpack</h1>
  }
}

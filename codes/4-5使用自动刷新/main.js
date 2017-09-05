import React, { Component } from 'react';
import { render } from 'react-dom';
import './main.css';

class Button extends Component {
  render() {
    return <h1>Hello,Webpack 123</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';

function hello(name) {
  return 'hello ' + name;
}

class Button extends Component {
  render() {
    return hello(this.props.name);
  }
}

console.log(renderToString(<Button name='webpack'/>));

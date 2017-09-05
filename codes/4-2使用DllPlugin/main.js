import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'whatwg-fetch';

import React, { Component } from 'react';
import { render } from 'react-dom';

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));

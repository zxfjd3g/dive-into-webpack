import React, { Component } from 'react';
import { render } from 'react-dom';
import './main.css';

class Button extends Component {
    render() {
        return <button>Hello,Webpack</button>
    }
}

render(<Button/>, window.document.getElementById('app'));
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Footer} from '../../components/footer';
import './index.css';

class App extends Component {
  render() {
    return [
      <h1>Page B</h1>,
      <Footer/>,
    ]
  }
}

render(<App/>, window.document.getElementById('app'));

import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';
import './main.css';

render(<AppComponent/>, window.document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

import React from 'react';
import { render } from 'react-dom';
import HelloWebpack from 'hello-webpack';
import 'hello-webpack/lib/index.css';

render(<HelloWebpack/>, window.document.getElementById('app'));

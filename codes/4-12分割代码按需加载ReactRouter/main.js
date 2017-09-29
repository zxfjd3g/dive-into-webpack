import React, {Component, createElement} from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';

function getAsyncComponent(promise) {
  return class AsyncComponent extends Component {
    componentDidMount() {
      promise.then(({default: component}) => {
        this.setState({
          component,
        })
      });
    }

    render() {
      const {component} = this.state || {};
      return component ? createElement(component) : null;
    }
  }
}

function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
        </nav>
        <hr/>
        <Route exact path='/' component={getAsyncComponent(import('./pages/home'))}/>
        <Route path='/about' component={getAsyncComponent(import('./pages/about'))}/>
      </div>
    </HashRouter>
  )
}

render(<App/>, window.document.getElementById('app'));

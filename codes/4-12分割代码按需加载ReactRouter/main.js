import React, {PureComponent, createElement} from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
import PageHome from './pages/home';

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
function getAsyncComponent(load) {
  return class AsyncComponent extends PureComponent {

    componentDidMount() {
      // 在高阶组件 DidMount 时才去执行网络加载步骤
      load().then(({default: component}) => {
        // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
        this.setState({
          component,
        })
      });
    }

    render() {
      const {component} = this.state || {};
      // component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
      return component ? createElement(component) : null;
    }
  }
}

// 根组件
function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/login'>Login</Link>
        </nav>
        <hr/>
        <Route exact path='/' component={PageHome}/>
        <Route path='/about' component={getAsyncComponent(
          // 异步加载函数，异步地加载 PageAbout 组件
          () => import(/* webpackChunkName: 'page-about' */'./pages/about')
        )}
        />
        <Route path='/login' component={getAsyncComponent(
          // 异步加载函数，异步地加载 PageAbout 组件
          () => import(/* webpackChunkName: 'page-login' */'./pages/login')
        )}
        />
      </div>
    </HashRouter>
  )
}

// 渲染根组件
render(<App/>, window.document.getElementById('app'));

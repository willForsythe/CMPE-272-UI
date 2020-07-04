import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Router } from 'react-router-dom';
import { ProductProvider } from './context'
import Auth from './Auth'
import History from './History'
import AuthProvider from './AuthProvider';

const auth = new Auth();

ReactDOM.render(
  <AuthProvider>
    <ProductProvider auth={auth}>
      <Router history={History}>
        <App auth={auth} />
      </Router>
    </ProductProvider>
  </AuthProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

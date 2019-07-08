import React from 'react';
import ReactDOM from 'react-dom';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './shared/main.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { logIn } from './actions/authActions';


if (localStorage.getItem('react-draw-sequence-token')) {
    const token = localStorage.getItem('react-draw-sequence-token');
    const expire = localStorage.getItem('react-draw-sequence-token-expire');
    store.dispatch(logIn(token, expire))
  }

const app = <Provider store={store}><App/></Provider>;

ReactDOM.render(app, document.getElementById('root'));

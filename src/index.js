import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styling/index.css'
// import Particles from 'react-particles-js'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './reducers/rootReducer';

// const store = createStore(rootReducer)
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
// import * as serviceWorker from './serviceWorker';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

if(process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/> 
  </Provider>
);
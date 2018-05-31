import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import App from './components/App.js';

// from reedux.js.org/basics/examples-todo-list
//const store = createStore(rootReducer);

const MyTodo = () => (
  //  <Provider store={store}>
      <App />
  //  </Provider>
);

export default MyTodo;

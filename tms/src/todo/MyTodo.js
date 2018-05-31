import React from 'react';
import Footer from './components/Footer.js'
import AddTodo from './containers/AddTodo.js'
import VisibleTodoList from './containers/VisibleTodoList.js'

// from reedux.js.org/basics/examples-todo-list
//const store = createStore(rootReducer);

const MyTodo = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default MyTodo;

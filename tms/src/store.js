import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';

//const middleware = applyMiddleware(promise, thunk, logger);
const middleware = applyMiddleware(logger);
const store = createStore(reducer, middleware);

console.log(store.getState());
export default store;

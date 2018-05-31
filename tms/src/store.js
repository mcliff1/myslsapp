import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducers';

//const middleware = applyMiddleware(promise, thunk, logger);
const middleware = applyMiddleware(thunkMiddleware, promiseMiddleware(),logger);
const store = createStore(reducer, {}, middleware);

console.log(store.getState());
export default store;

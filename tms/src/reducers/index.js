import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import customer from './customer';
import load from './load';

export default combineReducers({
    customer,
    load,
    todos,
    visibilityFilter
});

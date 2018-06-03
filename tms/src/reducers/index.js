import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import customer from './customer';
import load from './load';
import carrier from './carrier';

export default combineReducers({
    customer,
    load,
    carrier,
    todos,
    visibilityFilter
});

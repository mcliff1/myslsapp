import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import customer from './customer';
import load from './load';
import carrier from './carrier';
import order from './order';

export default combineReducers({
    customer,
    load,
    carrier,
    order,
    todos,
    visibilityFilter
});

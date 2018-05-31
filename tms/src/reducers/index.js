import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import customer from './customer';

export default combineReducers({
    customer,
    todos,
    visibilityFilter
});

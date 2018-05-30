import React from 'react';
import FilterLink from '../containers/FilterLink.js';
import { VisibilityFilters } from '../actions';

// from reduxjs.org/basics/usage-with-react
const Footer = () => (
    <div>
      Show:
      {' '}
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>
        All
      </FilterLink>
      {', '}
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
        Completed
      </FilterLink>
</div>
);

export default Footer;

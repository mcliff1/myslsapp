import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';

// from reduxjs.org/basics/usage-with-react
const Footer = () = (
    <p>
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
      <FilterLink filter={VisibilityFilters.SHOW_COMPLTED}>
        Completed
      </FilterLink>
</p>
}

export default Footer;

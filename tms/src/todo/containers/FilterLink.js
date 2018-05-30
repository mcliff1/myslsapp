import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from './Link.js';

// from reduxjs.org/basics/usage-with-react
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.VisibilityFilter
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}


const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink;

import React from 'react';
import PropTypes from 'prop-types';

// from reduxjs.org/basics/usage-with-react
const Link = ({active, children, onClick}) => (
    <button
      disabled={active}
      style={{ marginLeft: '4px' }}
      onClick = {onClick}
    >
      {children}
    </button>
);


Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;

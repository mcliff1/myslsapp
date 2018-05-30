import React from 'react';
import PropTypes from 'prop-types';

// from reduxjs.org/basics/usage-with-react
const Link = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a
      href = ""
      onClick = {e => {
          e.preventDefault();
          onClick();
      }}
      >
        {children}
    </a>
  );
}

Link.propTypes = {
  completed: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;

import React from 'react';
import PropTypes from 'prop-types';


const CustomerListDetail = ({info, onClick}) => {
  return(
    <div className="card-deck mt4">
      <div className="card border border-info rounded"
        onClick={() => onClick(info)}>
        <div className="card-body">
        <h5 className="card-title">{info.name}</h5>
        <p className="card-text">{info.city}, {info.state}</p>
        <p className="card-text">phone: {info.phone} email: {info.email}</p>
        </div>
      </div>
    </div>
  )
}

CustomerListDetail.propTypes = {
  info: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CustomerListDetail;

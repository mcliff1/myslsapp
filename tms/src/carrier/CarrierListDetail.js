import React from 'react';
import PropTypes from 'prop-types';


/**
 * Expects property info, and function onClick(info)
 */
const CarrierListDetail = ({info, onClick}) => {
    return(
      <div className="card-deck mt4">
        <div className="card border border-info rounded"
             onClick={ () => onClick(info)}>
          <div className="card-body">
            <h5 className="card-title">{info.name}</h5>
            <p className="card-text">{info.city}, {info.state}</p>
          </div>
        </div>
      </div>
  );
}

CarrierListDetail.propTypes = {
  info: PropTypes.object,
};

export default CarrierListDetail;

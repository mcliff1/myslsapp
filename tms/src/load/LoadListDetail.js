import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
* Expects property info, and function onClick(info)
*/
class LoadListDetail extends Component {

  render() {
    const info = this.props.info;
    return(
      <div className="card-deck mt4">
        <div className="card border border-info rounded"
             onClick={ (evt) => this.props.onClick(info)}>
          <div className="card-body">
            <h5 className="card-title">{ info.name }</h5>
            <p className="card-text">{ info.city }, {info.state }</p>
          </div>
        </div>
      </div>
    )
  };
}
LoadListDetail.propTypes = {
  info: PropTypes.object,
};

export default LoadListDetail;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const blank_cust =
{
  'name': '',
  'address1': '',
  'address2': '',
  'city': '',
  'state': '',
  'zip' : '',
  'phone' : '',
  'fax' : '',
  'email' : '',
  'website' : ''
};

class CustomerListDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info : props.info || blank_cust,
    }

  }


  render() {
    var info = this.state.info;
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded"
        onClick={ (evt) => this.props.onClick(info)}>
        <div className="card-body">
        <h5 className="card-title">{ info.name }</h5>
        <p className="card-text">{ info.city }, {info.state }</p>
        <p className="card-text">phone: { info.phone } email: {info.email }</p>
        </div>
      </div>
      </div>

    )
  };
}
CustomerListDetail.propTypes = {
  info: PropTypes.object,
};

export default CustomerListDetail;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';





class Carrier extends Component {

  render() {
    return(
      <div>
      <h2>Carrier</h2>
      <Link to="/carrier/detail">Customer Detail</Link> &nbsp; - &nbsp;
      <Link to="/carrier/list">Customer List</Link>

      </div>
    )
  };

}


export default Carrier;

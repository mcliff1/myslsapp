import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';





class Carrier extends React.Component {

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

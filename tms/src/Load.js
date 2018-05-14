import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';



class LoadDetail extends React.Component {

  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
          <div className="col">Status</div>
          <div className="col">Product</div>
          </div>
        </div>
      <h3>Shipper</h3>
      <h3>Consignee</h3>
      <h3>Carrier</h3>
      </div>
    )
  };
}


class LoadList extends React.Component {

  render() {
    return(
      <div>
      <h3>Load List</h3>
      </div>
    )
  };
}



class Load extends React.Component {

  render() {
    return(
      <div>
      <h2>Load</h2>
      <Link to="/load/detail">Load Detail</Link> &nbsp; - &nbsp;
      <Link to="/load/list">Load List</Link>

      <Route exact path="/load/detail" component={LoadDetail} />
      <Route exact path="/load/list" component={LoadList} />
      <Route path="/" render={() => <div></div>} />

      </div>
    )
  };

}


export default Load;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';



class CustomerDetail extends React.Component {

  render() {
    return(
      <div>
      <h3>Customer Detail</h3>
      </div>
    )
  };
}

class CustomerSummary extends React.Component {

  render() {
    return(
      <div>
        This is a single <Link to="/customer/detail">John doe</Link> record
      </div>
    )
  };
}


class CustomerList extends React.Component {

  render() {
    return(
      <div>
      <h3>Customer List</h3>
      <table>
      <tr><td><CustomerSummary /></td></tr>
      <tr><td><CustomerSummary /></td></tr>
      </table>
      </div>
    )
  };
}



class Customer extends React.Component {

  render() {
    return(
      <div>
      <h2>Customer</h2>
      <Link to="/customer/detail">Customer Detail</Link> &nbsp; - &nbsp;
      <Link to="/customer/">Customer List</Link>

      <Route exact path="/customer/detail" component={CustomerDetail} />
      <Route exact path="/customer/" component={CustomerList} />

      </div>
    )
  };

}


export default Customer;

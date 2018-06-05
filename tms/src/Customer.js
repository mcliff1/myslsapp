/**
 * @file Customer.js
 * (smart) Component for main customer panels/view
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import CustomerPanel from './customer/CustomerPanel'
import CustomerList from './customer/CustomerList'
import { updateCustomer, newCustomerPanel, deleteCustomer, closeCustomerPanel, openCustomerPanel, fetchCustomerList } from './actions/customerActions';



// props
//   (dispatch)
//   info (customer object)
//   customerList (list of customer objects)
//   isNewCustomer (boolean)

// Class represents a list and detail view of a customer
class Customer extends Component {
  constructor(props) {
    super(props);

    //this.state = {
    //  isNewCustomer: false,
    //  info : null
    //}
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

  }


  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.props.dispatch(openCustomerPanel(info));
  }

  handleAdd() {
    this.props.dispatch(newCustomerPanel());
  }

  handleRefresh() {
    if (this.props.needListUpdate) {
      this.props.dispatch(fetchCustomerList());
    }
  }

  handleDelete() {
    this.props.dispatch((dispatch) => {
      dispatch(deleteCustomer(this.props.info));
      //dispatch(fetchCustomerList());
    });

  }

  handleClose() {
    this.props.dispatch((dispatch) => {
      dispatch(closeCustomerPanel());
      //dispatch(fetchCustomerList());
    });

  }



  handleSubmit(method, info) {
    this.props.dispatch((dispatch) => {
      dispatch(updateCustomer(method, info));
      //dispatch(fetchCustomerList());
    });
  }


  renderDetail() {
    const { info, isNew } = this.props;

    return(
      <div>
        <CustomerPanel info={info}
                       isNew={isNew}
                       handleSubmit={this.handleSubmit}
                       handleDelete={this.handleDelete}
                       handleClose={this.handleClose} />
      </div>
    );
  }


  renderList() {
    const { customerList } = this.props;
    return(
      <div>
        <div className="App-title">Customer List {  }
        <Button onClick={this.handleAdd}>Add</Button>{ }
        <Button onClick={this.handleRefresh}>Refresh</Button>{ }
        </div>
          <CustomerList customerList={customerList}
                        freshList={() => this.handleRefresh()}
                        handleClick={(info) => this.handleClick(info)} />

      </div>
    );
  };

  render() {
    const hasInfo = (this.props.info !== null);
    return(
      <div>
        {hasInfo ? this.renderDetail() : this.renderList()}
      </div>
    );
  }
}




// from reduxjs.org/basics/usage-with-react
//  maps from the overall store to this component props
const mapStoreToProps = (store, ownProps) => {
  return {
    info: store.customer.info,
    customerList: store.customer.customerList,
    isNew: store.customer.isNew,
    needListUpdate: store.customer.needListUpdate
  }
}



export default withRouter(connect(mapStoreToProps)(Customer));

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

    //this.handleAdd = this.handleAdd.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClose = this.handleClose.bind(this);
    //this.handleDelete = this.handleDelete.bind(this);
    //this.handleRefresh = this.handleRefresh.bind(this);

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
    const { info, isNew, handleSubmit, handleDelete, handleClose } = this.props;

    return(
      <div>
        <CustomerPanel info={info}
                       isNew={isNew}
                       handleSubmit={handleSubmit}
                       handleDelete={handleDelete}
                       handleClose={handleClose} />
      </div>
    );
  }


  renderList() {
    const { customerList, handleAdd, handleRefresh, handleClick } = this.props;
    return(
      <div>
        <div className="App-title">Customer List {  }
        <Button onClick={handleAdd}>Add</Button>{ }
        <Button onClick={handleRefresh}>Refresh</Button>{ }
        </div>
          <CustomerList customerList={customerList}
                        freshList={() => handleRefresh()}
                        handleClick={(info) => handleClick(info)} />

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

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: () => { dispatch(newCustomerPanel()) },
    handleRefresh: () => dispatch(fetchCustomerList()),
    handleDelete: (info) => dispatch(deleteCustomer(info)),
    handleSubmit: (method, info) => dispatch(updateCustomer(method, info)),
    handleClick: (info) => dispatch(openCustomerPanel(info)),
    handleClose: () => dispatch(closeCustomerPanel())
  }
}


export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Customer));

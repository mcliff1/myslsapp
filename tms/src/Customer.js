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
import { submitCustomer, newCustomerPanel, deleteCustomer, closeCustomerPanel, openCustomerPanel, fetchCustomerList } from './actions/customerActions';



const DetailView = ({ info, isNew, handleDelete, handleClose, handleSubmit }) => {
  return(
    <div>
      <CustomerPanel info={info}
                     isNew={isNew}
                     handleSubmit={handleSubmit}
                     handleDelete={handleDelete}
                     handleClose={handleClose} />
    </div>
  );
};

const SummaryView = ({ customerList, handleAdd, handleRefresh, handleClick }) => {
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


// Class represents a list and detail view of a customer
class Customer extends Component {

  render() {
    const hasInfo = (this.props.info !== null);
    return(
      <div>
        {hasInfo ? <DetailView {...this.props} /> : <SummaryView {...this.props} />}
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
    handleDelete: (id) => dispatch(deleteCustomer(id)) ,
    handleSubmit: (method, info) => dispatch(submitCustomer(method, info)),
    handleClick: (info) => dispatch(openCustomerPanel(info)),
    handleClose: () => dispatch(closeCustomerPanel())
  }
}


export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Customer));

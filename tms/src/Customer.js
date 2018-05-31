import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import CustomerPanel from './customer/components/CustomerPanel'
import CustomerListDetail from './customer/components/CustomerListDetail'
import { updateCustomer, newCustomerPanel, deleteCustomer, closeCustomerPanel, openCustomerPanel, fetchCustomerList } from './actions/customerActions';



// Class represents a list and detail view of a customer
class Customer extends Component {
  constructor(props) {
    super(props);

    //this.state = {
    //  isNewCustomer: false,
    //  info : null
    //}
    this.handleOpenList = this.handleOpenList.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentWillMount() {

    console.log("componentWillMount");
    this.props.dispatch((dispatch) => {
      dispatch(fetchCustomerList());
    });
  }

  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.props.dispatch(openCustomerPanel(info));
  }

  handleOpenList() {
    this.props.dispatch(newCustomerPanel());

  }

  handleAdd() {
    this.props.dispatch(newCustomerPanel());
  }

  handleDelete() {
    this.props.dispatch((dispatch) => {
      dispatch(deleteCustomer(this.props.info));
      dispatch(fetchCustomerList());
    });

  }

  handleClose() {
    this.props.dispatch((dispatch) => {
      dispatch(closeCustomerPanel());
      dispatch(fetchCustomerList());
    });

  }



  handleSubmit(method, info) {
    this.props.dispatch((dispatch) => {
      dispatch(updateCustomer(method, info));
      dispatch(fetchCustomerList());
    });
  }


  renderDetail() {
    const { info, isNewCustomer } = this.props;

    return(
      <div>
        <CustomerPanel info={info}
                       isNewCustomer={isNewCustomer}
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
        <Button onClick={this.handleAdd}>Add</Button>
        </div>


              <div>
              {
                  customerList.map((item, idx) => {
                    return(
                      <div key={idx}>
                        <CustomerListDetail info={item} key={idx}
                          onClick={(info) => this.handleClick(info)} />
                      </div>
                    );
                  })

              }
              </div>

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
    isNewCustomer: store.customer.isNewCustomer
  }
}


//const mapDispatchToProps = (dispatch, ownProps) => {
//  return {
//    onClick: () => {
//      dispatch(setVisibilityFilter(ownProps.filter))
//    }
//  }
//}
// which properties do we want here?
//const FilterLink = connect(
//  mapStateToProps,
//  mapDispatchToProps
//)(Link)

export default withRouter(connect(mapStoreToProps)(Customer));

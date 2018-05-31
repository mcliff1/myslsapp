import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Link } from 'reactstrap';
import { connect } from 'react-redux';
import CustomerPanel from './customer/components/CustomerPanel'
import CustomerListDetail from './customer/components/CustomerListDetail'
import { openNewCustomerPanel } from './actions/customerActions';
import { openNewCustomerPanel2 } from './actions/customerActions';



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

  }


  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.setState({
      isNewCustomer: false,
      info: info
    });
  }

  handleOpenList() {
    console.log('open lixg');
    this.props.dispatch(openNewCustomerPanel());

    this.props.history.push("/customer");
  }

  handleAdd() {
    console.log('clicked on the add');
    this.props.dispatch(openNewCustomerPanel2());
  }


  renderDetail() {
    const { info, isNewCustomer } = this.props;

    return(
      <div>
        <CustomerPanel info={info}
                       isNewCustomer={isNewCustomer}
                       handleClose={this.handleOpenList} />
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
    customerList: store.customer.customerList
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

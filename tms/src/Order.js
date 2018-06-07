/**
 * @file Order.js
 * (smart) Component for main order panels/view
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import OrderPanel from './order/OrderPanel'
import OrderList from './order/OrderList'
import { deleteOrder, closeOrderPanel, openOrderPanel, fetchOrderList, submitOrder } from './actions/orderActions';



const DetailView = ({ info, isNew, handleDelete, handleClose, handleSubmit }) => {
  return(
    <div>
      <OrderPanel info={info}
                 isNew={isNew}
                 handleSubmit={handleSubmit}
                 handleDelete={handleDelete}
                 handleClose={handleClose} />
    </div>
  );
};


const SummaryView = ({ orderList, handleAdd, handleRefresh, handleOpen }) => {
  return(
    <div>
      <div className="App-title">Order List &nbsp;&nbsp;
        <Button onClick={() => handleOpen({})}>Add</Button>
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>

      <OrderList orderList={orderList}
              freshList={() => handleRefresh()}
                  handleClick={(info) => handleOpen(info)} />
    </div>
  );
}


class Order extends Component {
  componentWillMount() {
    this.props.handleRefresh();
  }

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
    info: store.order.info,
    orderList: store.order.orderList,
    isNew: store.order.isNew,
    needListUpdate: store.order.needListUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRefresh: () => dispatch(fetchOrderList()),
    handleDelete: (id) => dispatch(deleteOrder(id)) ,
    handleSubmit: (method, info) => dispatch(submitOrder(method, info)),
    handleOpen: (info) => dispatch(openOrderPanel(info)),
    handleClose: () => dispatch(closeOrderPanel())
  }
}


export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Order));

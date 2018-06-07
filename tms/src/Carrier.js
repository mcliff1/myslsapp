/**
 * @file Carrier.js
 * (smart) Component for main carrier panels/view
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import CarrierPanel from './carrier/CarrierPanel'
import CarrierList from './carrier/CarrierList'
import { deleteCarrier, closeCarrierPanel, openCarrierPanel, fetchCarrierList, submitCarrier } from './actions/carrierActions';


const DetailView = ({ info, isNew, handleDelete, handleClose, handleSubmit }) => {
  return(
    <div>
    <CarrierPanel info={info}
      isNew={isNew}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      handleClose={handleClose} />
    </div>

  );
};


const SummaryView = ({ carrierList, handleAdd, handleRefresh, handleOpen }) => {
  return(
    <div>
    <div className="App-title">Carrier List &nbsp;&nbsp;
    <Button onClick={() => handleOpen({})}>Add</Button>
    <Button onClick={handleRefresh}>Refresh</Button>{ }
    </div>

    <CarrierList carrierList={carrierList}
      freshList={() => handleRefresh()}
      handleClick={(info) => handleOpen(info)} />
    </div>
  );
}


class Carrier extends Component {

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


const mapStoreToProps = (store, ownProps) => {
  return {
    info: store.carrier.info,
    carrierList: store.carrier.carrierList,
    isNew: store.carrier.isNew,
    needListUpdate: store.carrier.needListUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRefresh: () => dispatch(fetchCarrierList()),
    handleDelete: (id) => dispatch(deleteCarrier(id)) ,
    handleSubmit: (method, info) => dispatch(submitCarrier(method, info)),
    handleOpen: (info) => dispatch(openCarrierPanel(info)),
    handleClose: () => dispatch(closeCarrierPanel())
  }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Carrier));

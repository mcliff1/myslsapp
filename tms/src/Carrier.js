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
import { newCarrierPanel, deleteCarrier, closeCarrierPanel, openCarrierPanel, fetchCarrierList, submitCarrier } from './actions/carrierActions';

class Carrier extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }


  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.props.dispatch(openCarrierPanel(info));
  }

  handleAdd() {
    this.props.dispatch(newCarrierPanel());
  }

  handleRefresh() {
    if (this.props.needListUpdate) {
      this.props.dispatch(fetchCarrierList());
    }
  }

  handleDelete() {
    this.props.dispatch(deleteCarrier(this.props.info));
  }

  handleClose() {
    this.props.dispatch(closeCarrierPanel());
  }


  /**
   * Will call POST or PUT as appropriate
   */
  handleSubmit(isNew, info) {
    this.props.dispatch(submitCarrier(isNew, info));
  }


  renderDetail() {
    return(
      <div>
      <CarrierPanel info={this.props.info}
        isNew={this.props.isNew}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        handleClose={this.handleClose} />
      </div>
    );
  }

  renderList() {
    return(
      <div>
      <div className="App-title">Carrier List &nbsp;&nbsp;
      <Button onClick={this.handleAdd}>Add</Button>
      <Button onClick={this.handleRefresh}>Refresh</Button>{ }
      </div>

      <CarrierList carrierList={this.props.carrierList}
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


const mapStoreToProps = (store, ownProps) => {
  return {
    info: store.carrier.info,
    carrierList: store.carrier.carrierList,
    isNew: store.carrier.isNew,
    needListUpdate: store.carrier.needListUpdate
  }
}


export default withRouter(connect(mapStoreToProps)(Carrier));

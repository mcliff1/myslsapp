/**
 * @file Load.js
 * (smart) Component for main load panels/view
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import LoadPanel from './load/LoadPanel'
import LoadList from './load/LoadList'
import { newLoadPanel, deleteLoad, closeLoadPanel, openLoadPanel, fetchLoadList, submitLoad } from './actions/loadActions';



class Load extends Component {
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
    this.props.dispatch(openLoadPanel(info));
  }

  handleAdd() {
    this.props.dispatch(newLoadPanel());
  }

  handleRefresh() {
    if (this.props.needListUpdate) {
      this.props.dispatch(fetchLoadList());
    }
  }

  handleDelete() {
    this.props.dispatch(deleteLoad(this.props.info));
  }

  handleClose() {
    this.props.dispatch(closeLoadPanel());
  }



  handleSubmit(isNew, info) {
    this.props.dispatch(submitLoad(isNew, info));
  }


  renderDetail() {
      return(
        <div>
          <LoadPanel info={this.props.info}
                     isNew={this.props.isNew}
                     handleSubmit={this.handleSubmit}
                     handleDelete={this.handleDelete}
                     handleClose={this.handleOpenList} />
        </div>
      );
    }

  renderList() {
    return(
      <div>
        <div className="App-title">Load List &nbsp;&nbsp;
        <Button onClick={this.handleAdd}>Add</Button>
        <Button onClick={this.handleRefresh}>Refresh</Button>{ }
        </div>

          <LoadList loadList={this.props.loadList}
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
    info: store.load.info,
    loadList: store.load.loadList,
    isNew: store.load.isNew,
    needListUpdate: store.load.needListUpdate
  }
}



export default withRouter(connect(mapStoreToProps)(Load));

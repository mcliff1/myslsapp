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
import { deleteLoad, closeLoadPanel, openLoadPanel, fetchLoadList, submitLoad } from './actions/loadActions';



const DetailView = ({ info, isNew, handleDelete, handleClose, handleSubmit }) => {
  return(
    <div>
      <LoadPanel info={info}
                 isNew={isNew}
                 handleSubmit={handleSubmit}
                 handleDelete={handleDelete}
                 handleClose={handleClose} />
    </div>
  );
};


const SummaryView = ({ loadList, handleRefresh, handleOpen }) => {
  return(
    <div>
      <div className="App-title">Load List &nbsp;&nbsp;
        <Button onClick={() => handleOpen({})}>Add</Button>
        <Button onClick={handleRefresh}>Refresh</Button>{ }
      </div>

      <LoadList loadList={loadList}
              freshList={() => handleRefresh()}
                  handleClick={(info) => handleOpen(info)} />
    </div>
  );
}


class Load extends Component {
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
    info: store.load.info,
    loadList: store.load.loadList,
    isNew: store.load.isNew,
    needListUpdate: store.load.needListUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRefresh: () => dispatch(fetchLoadList()),
    handleDelete: (id) => dispatch(deleteLoad(id)) ,
    handleSubmit: (method, info) => dispatch(submitLoad(method, info)),
    handleOpen: (info) => dispatch(openLoadPanel(info)),
    handleClose: () => dispatch(closeLoadPanel())
  }
}


export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Load));

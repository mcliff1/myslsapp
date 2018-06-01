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
import { updateLoad, newLoadPanel, deleteLoad, closeLoadPanel, openLoadPanel, fetchLoadList } from './actions/loadActions';


const blank_load =
{
  'status': '',
  'product': '',
  'salesRep': '',
  'quantity': '',
  'equipment': '',
  'carrier' : '',
  'pickupDate' : '',
  'deliveryDate' : '',
  'destinationLocation' : '',
  'pickupLocation' : ''
};




//  this needs to be moved form the submit Method
//const method = this.props.isNewCustomer ? 'POST' : 'PUT';










class Load extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewRecord: false,
      info : null
    }
    this.handleOpenList = this.handleOpenList.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);

  }


    // sets the state so that we know we are looking at a
    // particular record
    handleClick(info) {
      this.setState({
        isNewRecord: false,
        info: info
      });
    }


    handleOpenAdd() {
      this.setState({
        isNewRecord : true,
        info: blank_load
      });
    }


    renderDetail() {
      return(
        <div>
          <LoadPanel info={this.state.info}
                         isNewRecord={this.state.isNewRecord}
                         handleClose={this.handleOpenList} />
        </div>
      );
    }

  renderList() {
    return(
      <div>
        <div className="App-title">Load List &nbsp;&nbsp;
        <Button onClick={this.handleOpenAdd}>Add</Button></div>


      </div>
    );
  };


  render() {
    const hasInfo = (this.state.info !== null);
    return(
      <div>
        {hasInfo ? this.renderDetail() : this.renderList()}
      </div>
    );
  }
}


export default withRouter(Load);

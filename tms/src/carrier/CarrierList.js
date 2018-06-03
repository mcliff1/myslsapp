import React, { Component } from 'react';
import CarrierListDetail from './CarrierListDetail'

class CarrierList extends Component {

  componentWillMount() {
    this.props.freshList();
  }

  render() {
    const { carrierList, handleClick } = this.props;
    return(
      <div>
      {
        carrierList.map((item, idx) => {
          return(
            <div key={idx}>
              <CarrierListDetail info={item} key={idx}
                onClick={(info) => handleClick(info)} />
            </div>
          );
        })
      }
      </div>
    );
  }
}

export default CarrierList;

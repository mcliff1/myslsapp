import React, { Component } from 'react';
import CustomerListDetail from './CustomerListDetail'


class CustomerList extends Component {

  componentWillMount() {
    this.props.freshList();
  }

  render() {
    const { customerList, handleClick } = this.props;
    return(
      <div>
      {
        customerList.map((item, idx) => {
          return(
            <div key={idx}>
              <CustomerListDetail info={item} key={idx}
                onClick={(info) => handleClick(info)} />
            </div>
          );
        })
      }
      </div>
    );
  }
}

export default CustomerList;

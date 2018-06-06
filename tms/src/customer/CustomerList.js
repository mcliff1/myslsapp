import React from 'react';
import CustomerListDetail from './CustomerListDetail'



const CustomerList = ({ customerList, handleClick }) => {
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

export default CustomerList;

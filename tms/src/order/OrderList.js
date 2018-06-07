import React from 'react';
import OrderListDetail from './OrderListDetail'

const OrderList = ({ orderList, handleClick }) => {
  return(
    <div>
      {
        orderList.map((item, idx) => {
          return(
            <div key={idx}>
              <OrderListDetail info={item} key={idx}
                onClick={(info) => handleClick(info)} />
            </div>
          );
        })
      }
    </div>
  );
}

export default OrderList;

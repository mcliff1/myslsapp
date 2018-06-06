import React from 'react';
import CarrierListDetail from './CarrierListDetail'

const CarrierList = ({ carrierList, handleClick }) => {
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

export default CarrierList;

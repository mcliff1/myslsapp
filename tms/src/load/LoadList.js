import React from 'react';
import LoadListDetail from './LoadListDetail'


const LoadList = ({loadList, handleClick}) => {
    return(
      <div>
      {
        loadList.map((item, idx) => {
          return(
            <div key={idx}>
              <LoadListDetail info={item} key={idx}
                onClick={(info) => handleClick(info)} />
            </div>
          );
        })
      }
      </div>
    );
}

export default LoadList;

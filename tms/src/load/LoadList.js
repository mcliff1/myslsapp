import React, { Component } from 'react';
import LoadListDetail from './LoadListDetail'


class LoadList extends Component {

  componentWillMount() {
    this.props.freshList();
  }

  render() {
    const { loadList, handleClick } = this.props;
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
}

export default LoadList;

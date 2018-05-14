import React, { Component } from 'react';


class CustDetail extends React.Component {

  render() {
    return(
      <div style={{ background: "#f0f0f0" }}>
      Joe Smith, Denver Colorado
      </div>

    )
  };
}



class Home extends React.Component {

  render() {
    return(
      <div>
      <h2>Home</h2>
      This is only the beginning, what am I doing?
      <CustDetail />
      </div>

    )
  };

}


export default Home;

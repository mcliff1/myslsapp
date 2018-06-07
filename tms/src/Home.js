import React from 'react';
import { connect } from 'react-redux';

const Home = ({user}) => {
  return(
    <div>
      <h2>Home</h2>
      Welcome to the Transportation Management System

      <p></p>
      {user ?
        <div>Logged in with email {user.attributes.email}</div>
        :
        <div>Please Login</div>
      }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.cognito.user,
  }
}
export default connect(mapStateToProps)(Home);

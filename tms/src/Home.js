import React, { Component } from 'react';


const loggedInPage = (user, attributes) => {
  <div>
    <h2>Home</h2>
    <p>Welcome to the Transportation Management Tool</p>
    <p>logged in as {user.getUsername()}</p>
  </div>
}


const loggedOutPage = () => {
  <div>
    <h2>Home</h2>
    <p>Welcome to the Transportation Management Tool</p>
    <p>please sign in</p>
  </div>
}

//class Home extends React.Component {
const Home = () => {
  return(
      <div>
      <h2>Home</h2>
      Welcome to the Transportation Management Tool
      </div>
  );
}



export default Home;

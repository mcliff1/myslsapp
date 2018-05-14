import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Customer from './Customer.js';
import Load from './Load.js';
import Carrier from './Carrier.js';




// not using this yet
const routes = [
 {
  path: "/",
  component: Home
 },
 {
  path: "/customer",
  component: Customer
 }
];


const App = () => (
      <Router>
      <div className="App">
        <nav class="navbar">
          <div class="nav-link"><Link to="/">Home</Link></div>
          <div class="nav-link"><Link to="/customer">Customer</Link></div>
          <div class="nav-link"><Link to="/load">Load</Link></div>
          <div class="nav-link"><Link to="/carrier">Carrier</Link></div>
          <div class="nav-link">Logged In User</div>
        </nav>

       <div class="container">
       <Route exact path="/" component={Home} />
       <Route path="/customer" component={Customer} />
       <Route path="/load" component={Load} />
       <Route path="/carrier" component={Carrier} />
       </div>

      </div>
      </Router>
    );




export default App;

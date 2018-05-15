import React from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';
import Home from './Home.js';
import Customer from './Customer.js';
import Load from './Load.js';
import Carrier from './Carrier.js';
import AppNav from './AppNav.js';

// https://react-bootstrap.github.io/components/label/



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
        <AppNav />

       <div className="container">
       <Route exact path="/" component={Home} />
       <Route path="/customer" component={Customer} />
       <Route path="/load" component={Load} />
       <Route path="/carrier" component={Carrier} />
       </div>

      </div>
      </Router>
    );




export default App;

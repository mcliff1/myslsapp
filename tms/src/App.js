import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Customer from './Customer.js';
import Load from './Load.js';
import Carrier from './Carrier.js';
import AppNav from './AppNav.js';

// https://react-bootstrap.github.io/components/label/



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

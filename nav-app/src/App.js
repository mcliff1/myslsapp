import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import './App.css';



const CustDetail = () => (
<div style={{ background: "#f0f0f0" }}>
Joe Smith, Denver Colorado
</div>
);


const Home = () => (
<div>
<h2>Home</h2>
This is only the beginning, what am I doing?
<CustDetail />
</div>
);



const CustomerDetail = () => (
<div>
<h3>Customer Detail</h3>
</div>
);


const CustomerList = () => (
<div>
<h3>Customer List</h3>
</div>
);



const Customer = () => (
<div>
<h2>Customer</h2>
<Link to="/customer/detail">Customer Detail</Link> &nbsp; - & nbsp;
<Link to="/customer/list">Customer List</Link>

<Route exact path="/customer/detail" component={CustomerDetail} />
<Route exact path="/customer/list" component={CustomerList} />
<Route path="/" render={() => <h3>Error, unknown</h3>} />

</div>
);

const Load = () => (
<div>
<h2>Load</h2>

</div>
);


const Carrier = () => (
<div>
<h2>Carrier</h2>

</div>
);





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

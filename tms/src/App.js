import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './App.css';
import Home from './Home.js';
import Customer from './Customer.js';
import Load from './Load.js';
import Carrier from './Carrier.js';
import AppNav from './AppNav.js';
import MyTodo from './todo/MyTodo.js';
import Login from './containers/Login.js';
import NotFound from './containers/NotFound.js';
import AuthenticatedRoute from './components/AuthenticatedRoute.js';


// https://react-bootstrap.github.io/components/label/
// https://github.com/AnomalyInnovations/serverless-stack-demo-client/

class App extends Component {
//const App = () => (
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    //this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenitcated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenitcated
    };


    return(
  <Router>
    <div className="App">
      <AppNav />
      <Switch>
        <Route exact path="/" component={Home} props={childProps} />
        <Route exact path="/login" component={Login} props={childProps}/>
        <Route exact path="/customer" component={Customer} props={childProps}/>
        <AuthenticatedRoute exact path="/load" component={Load} props={childProps}/>
        <Route exact path="/mytodo" component={MyTodo} props={childProps}/>
        <Route exact path="/carrier" component={Carrier} props={childProps}/>
        { /* catch any unmatched route */ }
        <Route component={NotFound} />
       </Switch>
    </div>
  </Router>
    )
  };
}

export default App;

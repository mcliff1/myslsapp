import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './App.css';
import Home from './Home';
import Customer from './Customer';
import Load from './Load';
import Carrier from './Carrier';
import Order from './Order';
import AppNav from './AppNav';
import MyTodo from './todo/MyTodo';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';


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



  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };


    return(
  <Router>
    <div className="App">
      <AppNav props={childProps} userHasAuthenticated={this.userHasAuthenticated} isAuthenticated={this.state.isAuthenticated}/>
      <Switch>
        <Route exact path="/" component={Home} props={childProps} />
        <UnauthenticatedRoute exact path="/login" component={Login} props={childProps} />
        <Route exact path="/signUp" component={Signup} props={childProps} userHasAuthenticated={this.userHasAuthenticated}/>
        <Route exact path="/customer" component={Customer} props={childProps}/>
        <Route exact path="/order" component={Order} props={childProps}/>
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

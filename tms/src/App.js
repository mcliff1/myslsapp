import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './App.css';
import Home from './Home';
import { connect } from 'react-redux';
import Customer from './Customer';
import Load from './Load';
import Carrier from './Carrier';
import Order from './Order';
import AppNav from './AppNav';
import MyTodo from './todo/MyTodo';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import { setUser } from './actions';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';


// https://react-bootstrap.github.io/components/label/
// https://github.com/AnomalyInnovations/serverless-stack-demo-client/

class App extends Component {
//const App = () => (
//const App = () => {
  //constructor(props) {
  //  super(props);
    state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  //}

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);

        const user = await Auth.currentAuthenticatedUser();
        this.props.setUserAction(user);

      } else {
        this.props.setUserAction(null);
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
    console.log('userHasAuthenticated()');
    this.setState({ isAuthenticated: authenticated });
  }




  handleLogout = async event => {
    await Auth.signOut();
    //this.props.userHasAuthenticated(false);
    //this.props.userHasAuthenticated(true);
    this.userHasAuthenticated(false);
    this.props.setUserAction(null);
    this.props.history.push("/login");
  }





  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };


    return(
  <Router>
    <div className="App">
      <AppNav handleLogout={this.handleLogout} userHasAuthenticated={this.userHasAuthenticated} isAuthenticated={this.state.isAuthenticated}/>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.cognito.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserAction: (user) => dispatch(setUser(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

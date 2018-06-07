import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';


// see auth0.com/blog/reactjs-authentication-tutorial/
// see github isotoma/react-cognito-example

// we get the property isAuthenticated passed in
class AppNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }



  login = () => {
    const { history } = this.props;
    this.setState({ loggedIn : true });
    history.push('/login');
  }




    handleSubmit = async event => {
      event.preventDefault();
      this.setState({isLoading:true});
      try {
        await Auth.signIn(this.state.email, this.state.password);
        this.props.userHasAuthenticated(true);
      } catch(e) {
        alert(e.message);
        this.setState({isLoading:false});
      }
    }


  handleLogout = async event => {
    await Auth.signOut();
    this.props.userHasAuthenticated(false);
    //this.props.userHasAuthenticated(true);

    this.props.history.push("/login");
  }

  render() {
    return(
      <div className="App-header">
      <Nav tabs>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/customer">Customer</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/order">Order</NavLink>
        </NavItem>
        { this.props.isAuthenticated ?
        <NavItem>
          <NavLink href="/load">Load</NavLink>
        </NavItem>
        :
        <NavItem />
        }
        <NavItem>
          <NavLink href="/carrier">Carrier</NavLink>
        </NavItem>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
          <DropdownItem><Link to="/myTodo">MyTodo</Link></DropdownItem>
          <DropdownItem><Link to="/signUp">Sign Up</Link></DropdownItem>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disable="true">admin</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>normal</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem className="authenticated"><div>Hi Log me out</div></NavItem>
        <NavItem>
        {
          (!this.props.isAuthenticated) ?
          (<button className="btn btn-info log" onClick={(evt) => this.login(evt)}>Log In</button>) :
          (<button className="btn btn-danger log" onClick={() => this.handleLogout()}>Log Out</button>)
        }
        </NavItem>
      </Nav>
      </div>
    );
  }
}


export default withRouter(AppNav);

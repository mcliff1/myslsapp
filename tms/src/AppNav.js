import React from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';


// see auth0.com/blog/reactjs-authentication-tutorial/
// see github isotoma/react-cognito-example
class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      loggedIn: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }



  isLoggedIn() {
    // const token = getIdToken*();
    // !!idToken && !isTokenExpired(idToken);
    return this.state.loggedIn;
  }

  login() {
    this.setState({ loggedIn : true });
  }

  logout() {
    this.setState({ loggedIn : false });
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
          <NavLink href="/load">Load</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/carrier">Carrier</NavLink>
        </NavItem>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link to="/myTodo">MyTodo</Link></DropdownItem>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disable="true">admin</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>normal</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem className="authenticated"><div>Hi Log me out</div></NavItem>
        <NavItem>
        {
          (this.isLoggedIn()) ?
          (<button className="btn btn-danger log" onClick={() => this.logout()}>Log Out</button>) :
          (<button className="btn btn-info log" onClick={() => this.login()}>Log In</button>)
        }
        </NavItem>
      </Nav>
      </div>
    );
  }
}


export default AppNav;

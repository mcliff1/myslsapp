import React from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';



class AppNav extends React.Component {
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

  render() {
    return(
      <div>
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
            <DropdownItem><Link to="/load/detail">Load Detail</Link></DropdownItem>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disable>admin</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>normal</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem className="authenticated"><div>Hi Log me out</div></NavItem>
        <NavItem className="dropdown anon-only">
        <NavLink>Log In</NavLink>
        </NavItem>
      </Nav>
      </div>
    );
  }
}


export default AppNav;

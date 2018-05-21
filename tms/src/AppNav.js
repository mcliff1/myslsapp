import React from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

class AppNav1 extends React.Component {

  render() {
    return(
    <nav className="navbar navbar-default navbar-inverse" role="navigation">
         <div className="container-fluid">
           <div className="collapse navbar-collapse">
             <ul className="nav navbar-nav">
               <li className="active"><a href="#">Home</a></li>
               <li className="authenticated"><a href="#new">New Post</a></li>
               <li className="authenticated"><a href="/test.html">Debug</a></li>
             </ul>
             <ul className="nav navbar-nav navbar-right">
               <li className="">
                 <p className="navbar-text">
                 Hi
                 <span id="current-user-name">you!</span>
                 <a id="buttonLogout">Log me out</a>
                 </p>
               </li>
               <li><p className="navbar-text anon-only">Got an account?</p></li>
               <li className="dropdown anon-only">
                 <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Log In</b><span className="caret"></span></a>
                 <ul id="login-dp" className="dropdown-menu">
                   <li>
                     <div className="row">
                       <div className="col-md-12" style={{paddingLeft: '20px', paddingRight: '20px'}}>
                         <form className="form" role="form" action="" id="login-nav">
                           <div className="form-group">
                             <label className="sr-only" htmlFor="username">Username</label>
                             <Input type="text" className="form-control" id="username" placeholder="Username" required />
                           </div>
                           <div className="form-group">
                             <label className="sr-only" htmlFor="password">Password</label>
                             <input type="password" className="form-control" id="password" placeholder="Password" required />
                           </div>
                           <div className="form-group">
                             <button type="button" id="buttonLogin" className="btn btn-primary btn-block">Sign in</button>
                           </div>
                         </form>
                       </div>
                       <div className="bottom text-center">
                         New here? <a href="/signup.html"><b>Join Us</b></a>
                       </div>
                     </div>
                   </li>
                 </ul>
               </li>
             </ul>
           </div>
         </div>
       </nav>
     );
  }
}



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
            <DropdownItem><Link to="/load/detail">Load Detail</Link></DropdownItem>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disable="true">admin</DropdownItem>
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

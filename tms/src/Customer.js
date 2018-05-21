import React from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';


const customer_list = [
  {
    'id' : '1',
    'name': 'My Company',
    'address1': '123 Fake Street',
    'address2': 'PO Box 123',
    'city': 'Centenntial',
    'state': 'CO',
    'zip' : '80111',
    'phone' : '(303) 123-1234',
    'fax' : null,
    'email' : 'chewie@bacca.com',
    'website' : 'https://myco.com'
  },
  {
    'id' : '2',
    'name': 'The Mint',
    'address1': '101 Broadway',
    'address2': 'The Vault Room',
    'city': 'Denver',
    'state': 'CO',
    'zip' : '80001',
    'phone' : '(303) GET-CASH',
    'fax' : null,
    'email' : 'money@bank.com',
    'website' : 'https://themint.com'
  }

]


class CustomerDetail extends React.Component {

  render() {
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded">
        <div className="card-body">
        <h5 className="card-title">{ this.props.info.name }</h5>
        <p className="card-text">{ this.props.info.city }, {this.props.info.state }</p>
        <p className="card-text">phone: { this.props.info.phone } email: {this.props.info.email }</p>
        </div>
      </div>
      </div>

    )
  };
}


class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;  // unless type = checkbox use target.checked
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value} );
  }

  handleSubmit(event) {
    alert('name wqas submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>

    )
  };
}



class CustomerSummary extends React.Component {

  render() {
    return(
      <div>
        This is a single <Link to="/customer/detail">John doe</Link> record
      </div>
    )
  };
}


class CustomerList extends React.Component {


  render() {
    return(
      <div>
        <h3>Customer List</h3>

        <div className="container">
        { customer_list.map( (customer, idx) => {
          return(
            <div className="row" key={idx}>
            <CustomerDetail info={customer} key={idx} />
            <p/>
            </div>
          )
        })}
        </div>
      </div>
    )
  };
}



class Customer extends React.Component {

  render() {
    return(
      <div>
      <h2>Customer</h2>
      <Link to="/customer/add">Add</Link> &nbsp; - &nbsp;
      <Link to="/customer/detail">Customer Detail</Link> &nbsp; - &nbsp;
      <Link to="/customer/">Customer List</Link>

      <Route exact path="/customer/add" component={CustomerAdd} />
      <Route exact path="/customer/detail" component={CustomerDetail} />
      <Route exact path="/customer/" component={CustomerList} />

      </div>
    )
  };

}


export default Customer;

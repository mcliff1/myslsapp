import React from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import { Form, FormGroup, Label, Col, Button, Text } from 'reactstrap';


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
  constructor(props) {
    super(props);

    this.state = {
      name : 'fred'
    }
  }

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


class LoadContent extends React.Component {
  state = {
    loading: true,
    error: false,
    data: [],
  };

  componentDidMount1() {
    fetch(this.props.url)
      // we should check status code here and throw on errors
      .then(res => res.json())
      .then((data) => this.setState({data, loading: false}))
      .catch((err) => this.setState({loading: false, error: true}))
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: customer_list
      });
    }, 500);
  }


  render() {
    return(
      <div>
        {this.props.children({
          ...this.props,
          ...this.state,
        })}
      </div>
    )
  }
}


class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      fax: '',
      email: '',
      website: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value} );
  }

  handleSubmit(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const name = target.name;

    alert('name was submitted: ' + event.name);
    event.preventDefault();
    this.props.history.push('/customer/');
  }


  render() {
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>

        <FormGroup row>
          <Label for="custName" sm={2}>Name</Label>
          <Col sm={10}>
            <input type="text" value={this.state.name} name="name" id="custName" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress1" sm={2}>Address</Label>
          <Col sm={10}>
            <input type="text" value={this.state.address1} name="address1" id="custAddress" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress2" sm={2}>Address2</Label>
          <Col sm={10}>
            <input type="text" value={this.state.address2} name="address2" id="custAddress2" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custCity" sm={2}>City</Label>
          <Col sm={10}>
            <input type="text" value={this.state.city} name="city" id="custCity" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custState" sm={2}>State</Label>
          <Col sm={10}>
            <input type="text" value={this.state.state} name="state" id="custState" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custZip" sm={2}>Zip</Label>
          <Col sm={10}>
            <input type="text" value={this.state.zip} name="zip" id="custZip" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custPhone" sm={2}>Phone</Label>
          <Col sm={10}>
            <input type="text" value={this.state.phone} name="phone" id="custPhone" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custFax" sm={2}>Fax</Label>
          <Col sm={10}>
            <input type="text" value={this.state.fax} name="fax" id="custFax" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <input type="text" value={this.state.email} name="email" id="custEmail" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custWebsite" sm={2}>Website</Label>
          <Col sm={10}>
            <input type="text" value={this.state.website} name="website" id="custWebsite" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Button type="submit">Submit</Button>
        </FormGroup>
        </Form>
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
        <div className="App-title">Customer List</div>

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

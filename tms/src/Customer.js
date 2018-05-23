import React from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import { Form, FormGroup, Label, Col, Button, Text } from 'reactstrap';
import LoadContent from './LoadContent.js';

const blank_cust =
{
  'name': '',
  'address1': '',
  'address2': '',
  'city': '',
  'state': '',
  'zip' : '',
  'phone' : '',
  'fax' : '',
  'email' : '',
  'website' : ''
};





class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info : props.info || blank_cust,
    };
  }

  render() {
    var info = this.state.info;
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded">
        <div className="card-body">
        <h5 className="card-title">{ info.name }</h5>
        <p className="card-text">{ info.city }, {info.state }</p>
        <p className="card-text">phone: { info.phone } email: {info.email }</p>
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

    this.setState({ [name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;

    const name = target.name;


    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);

    //alert('name was submitted: ' + event.name);
    console.log(event);
    //const data = new FormData(event.target);
    fetch('https://tms-dev-api.mattcliff.net', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch((err) => alert(err));


    alert(event);
    this.props.history.push('/customer/');
  }


  render() {
    var info = this.state.info;
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>

        <FormGroup row>
          <Label for="custName" sm={2}>Name</Label>
          <Col sm={10}>
            <input type="text" value={this.state.name} ref="name" name="name" id="custName" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress1" sm={2}>Address</Label>
          <Col sm={10}>
            <input type="text" value={this.state.address1} ref="address1" name="address1" id="custAddress" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress2" sm={2}>Address2</Label>
          <Col sm={10}>
            <input type="text" value={this.state.address2} ref="address2" name="address2" id="custAddress2" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custCity" sm={2}>City</Label>
          <Col sm={10}>
            <input type="text" value={this.state.city} ref="city" name="city" id="custCity" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custState" sm={2}>State</Label>
          <Col sm={10}>
            <input type="text" value={this.state.state} ref="state" name="state" id="custState" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custZip" sm={2}>Zip</Label>
          <Col sm={10}>
            <input type="text" value={this.state.zip} ref="zip" name="zip" id="custZip" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custPhone" sm={2}>Phone</Label>
          <Col sm={10}>
            <input type="text" value={this.state.phone} ref="phone" name="phone" id="custPhone" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custFax" sm={2}>Fax</Label>
          <Col sm={10}>
            <input type="text" value={this.state.fax} ref="fax" name="fax" id="custFax" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <input type="text" value={this.state.email} ref="email" name="email" id="custEmail" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custWebsite" sm={2}>Website</Label>
          <Col sm={10}>
            <input type="text" value={this.state.website} ref="website" name="website" id="custWebsite" onChange={this.handleChange} />
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
        <LoadContent url="https://tms-dev-api.mattcliff.net/">
        {
          ({ loading, error, data}) => {

            if (loading) return <span>Loading...</span>
            return (
              <div>
                {
                  data.map((item, idx) => <div key={idx}>{item.name}</div>)
                }
              </div>
            )
          }
        }
        </LoadContent>
      </div>
    )
  };
}


class CustomerList extends React.Component {


  render() {
    return(
      <div>
        <div className="App-title">Customer List</div>

        <LoadContent url="https://tms-dev-api.mattcliff.net/">
        {
          ({ loading, error, data}) => {

            if (loading) return <span>Loading...</span>
            return (
              <div>
              {
                data.map((item, idx) => {
                  return(
                  <div key={idx}>
                    <CustomerDetail info={item} key={idx} />
                  </div>
                );
                })
              }
              </div>
            )
          }
        }
        </LoadContent>


      </div>
    )
  };
}



class Customer extends React.Component {

  render() {
    return(
      <div>
      <Link to="/customer/add">Add</Link> &nbsp; - &nbsp;
      <Link to="/customer/detail">Customer Detail</Link> &nbsp; - &nbsp;
      <Link to="/customer/">Customer List</Link>

      <Route exact path="/customer/add" component={CustomerAdd} />
      <Route exact path="/customer/detail" component={CustomerSummary} />
      <Route exact path="/customer/" component={CustomerList} />

      </div>
    )
  };

}


export default Customer;

import React from 'react';
import { BrowserRouter as Router, Route,  Link, withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Col, Button, Text } from 'reactstrap';
import PropTypes from 'prop-types';
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





class CustomerListDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info : props.info || blank_cust,
    }

    //this.openDetail = this.openDetail.bind(this);
  }

  // this should open the customer detail for the selected user
  openDetail(evt, info) {
    //this.props.history.push('/customer/d2');
    this.context.router.push('/customer/d2');
    //return(
    //  <Router>
    //  <Route path="/" component={Customer} />
    // </Router>
    //)

  }

  render() {
    var info = this.state.info;
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded"
        onClick={ (evt) => this.props.onClick(info)}>
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
CustomerListDetail.propTypes = {
  info: PropTypes.object,
};



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

    // see https://stackoverflow.com/questions/29775797/fetch-post-json-data?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    //  (Francisco Presnecia for better way)

    //const data = new FormData(event.target);
    fetch('https://tms-dev-api.mattcliff.net', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log('error ==>', err));


    //this.props.router.push('/customer/');
    return(
      <Router>
      <Route path="/" component={Customer} />
     </Router>
    )
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






// Class represents a list and detail view of a customer
class CustomerMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info : null
    }
  }


  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.setState({ info: info} );
  }

  handleOpenList() {
    this.setState({ info: null });
  }


  renderDetail() {
    var info = this.state.info;
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded"
      onClick={(info) => this.handleOpenList(info)} >
        <div className="card-body">
          <h5 className="card-title">{ info.name }</h5>
          <p className="card-text">{ info.city }, {info.state }</p>
          <p className="card-text">phone: { info.phone } email: {info.email }</p>
        </div>
      </div>
      </div>

    )
  };

  renderList() {
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
                    <CustomerListDetail info={item} key={idx}
                      onClick={(info) => this.handleClick(info)} />
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
    );
  };

  render() {
    const hasInfo = (this.state.info !== null);
    return(
      <div>
        {hasInfo ? this.renderDetail() : this.renderList()}
      </div>
    );
  }
}


// Primary Class to Route to at the App level
//   for Customer UI
class Customer extends React.Component {

  render() {
    return(
      <div>
      <Link to="/customer/add">Add</Link> &nbsp; - &nbsp;
      <Link to="/customer/">Customer List</Link>

      <Route exact path="/customer/add" component={CustomerAdd} />
      <Route exact path="/customer/" component={CustomerMain} />

      </div>
    )
  };

}


export default Customer;

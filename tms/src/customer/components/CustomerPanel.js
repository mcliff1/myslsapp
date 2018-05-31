import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button } from 'reactstrap';

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

const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev';


class CustomerPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      info: this.props.info || blank_cust
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  // not sure if we should keep the 'controlled' UI pattern with redux
  //
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { info } = this.state;

    // this addres the controlled input on the form
    // these are immutable changes
    this.setState({
      info: {
        ...info,
        [name]: value
      }
    });
  }



  handleSubmit(event) {
    event.preventDefault();

    //const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;

    //const name = target.name;

    const method = this.props.isNewCustomer ? 'POST' : 'PUT';

    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    if (!this.props.isNewCustomer) {
      formData['Id'] = this.state.info.Id;
      formData['ObjectType'] = this.state.info.ObjectType;
    }
    console.log('method-->', method);
    console.log('-->', formData);


    fetch(API_ENDPOINT, {
      method: method,
      headers: {
        'Accept' : 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log('error ==>', err));


    this.props.handleClose();
  }


  handleDelete() {
    const info = this.state.info;
    console.log("going to delete customer id:", info.Id);
    fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : info.Id, 'ObjectType' : info.ObjectType })
    })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log('error ==>', err));

    this.props.handleClose();
  }


  render() {
    const info = this.state.info;
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>

        <FormGroup row>
          <Label for="custName" sm={2}>Name</Label>
          <Col sm={10}>
            <input type="text" value={info.name} ref="name" name="name" id="custName" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress1" sm={2}>Address</Label>
          <Col sm={10}>
            <input type="text" value={info.address1} ref="address1" name="address1" id="custAddress" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custAddress2" sm={2}>Address2</Label>
          <Col sm={10}>
            <input type="text" value={info.address2} ref="address2" name="address2" id="custAddress2" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custCity" sm={2}>City</Label>
          <Col sm={10}>
            <input type="text" value={info.city} ref="city" name="city" id="custCity" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custState" sm={2}>State</Label>
          <Col sm={10}>
            <input type="text" value={info.state} ref="state" name="state" id="custState" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custZip" sm={2}>Zip</Label>
          <Col sm={10}>
            <input type="text" value={info.zip} ref="zip" name="zip" id="custZip" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custPhone" sm={2}>Phone</Label>
          <Col sm={10}>
            <input type="text" value={info.phone} ref="phone" name="phone" id="custPhone" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custFax" sm={2}>Fax</Label>
          <Col sm={10}>
            <input type="text" value={info.fax} ref="fax" name="fax" id="custFax" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <input type="text" value={info.email} ref="email" name="email" id="custEmail" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="custWebsite" sm={2}>Website</Label>
          <Col sm={10}>
            <input type="text" value={info.website} ref="website" name="website" id="custWebsite" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          {this.props.isNewCustomer ?
            <Button type="submit">Submit</Button> :
            <Button type="submit">Update</Button>
          }

          <Button onClick={this.handleDelete}>Delete</Button>
          <Button onClick={this.props.handleClose}>Close</Button>
        </FormGroup>
        </Form>
      </div>

    )
  };
}


export default CustomerPanel;

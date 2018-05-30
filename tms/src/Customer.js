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

const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev';




class CustomerListDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info : props.info || blank_cust,
    }

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








class CustomerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewCustomer: this.props.isNewCustomer,
      info: this.props.info || blank_cust
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

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

    const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;

    const name = target.name;


    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);

    fetch(API_ENDPOINT, {
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
      body: JSON.stringify({'Id' : info.Id, 'CreatedAt' : info.CreatedAt })
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
          {this.state.isNewCustomer ?
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




// Class represents a list and detail view of a customer
class Customer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewCustomer: false,
      info : null
    }
    this.handleOpenList = this.handleOpenList.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);

  }


  // sets the state so that we know we are looking at a
  // particular record
  handleClick(info) {
    this.setState({
      isNewCustomer: false,
      info: info
    });
  }

  handleOpenList() {
    this.setState({
      isNewCustomer: true,
      info: null
    });


    fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log('error ==>', err));
    this.props.history.push("/customer");
  }

  handleOpenAdd() {
    this.setState({
      isNewCustomer : true,
      info: blank_cust
    });
  }


  renderDetail() {
    return(
      <div>
        <CustomerPanel info={this.state.info}
                       isNewCustomer={this.state.isNewCustomer}
                       handleClose={this.handleOpenList} />
      </div>
    );
  }


  renderList() {
    return(
      <div>
        <div className="App-title">Customer List &nbsp;&nbsp;
        <Button onClick={this.handleOpenAdd}>Add</Button></div>


        <LoadContent url={API_ENDPOINT}>
        {
          ({loading, error, data}) => {

            if (loading) return <span>Loading...</span>
            if (!Array.isArray(data)) return <span></span>
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


export default withRouter(Customer);

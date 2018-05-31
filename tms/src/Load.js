import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, Link, withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Col, Input, Button, FormText } from 'reactstrap';
import LoadContent from './LoadContent.js';



const blank_load =
{
  'status': '',
  'product': '',
  'salesRep': '',
  'quantity': '',
  'equipment': '',
  'carrier' : '',
  'pickupDate' : '',
  'deliveryDate' : '',
  'destinationLocation' : '',
  'pickupLocation' : ''
};

const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev';


class LoadListDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info : props.info || blank_load,
    }

  }


  render() {
    var info = this.state.info;
    return(
      <div className="card-deck mt4">
      <div className="card border border-info rounded"
        onClick={ (evt) => this.props.onClick(info)}>
        <div className="card-body">
        <h5 className="card-title">{ info.carrier }</h5>
        <p className="card-text">status: { info.status }, equipmnet: { info.equipment }</p>
        <p className="card-text">pickupDate: { info.pickupDate } deliveryDate: { info.deliveryDate }</p>
        </div>
      </div>
      </div>

    )
  };
}




class LoadPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewRecord: this.props.isNewRecord,
      info: this.props.info || blank_load
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
    const name = target.name;

    const method = this.state.isNewRecord ? 'POST' : 'PUT';


    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    if (!this.state.isNewRecord) {
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
    console.log("going to delete id:", info.Id);
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
          <Label for="loadStatus" sm={2}>Status</Label>
          <Col sm={10}>
            <input type="text" value={info.status} ref="status" name="status" id="loadStatus" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadProduct" sm={2}>Product</Label>
          <Col sm={10}>
            <input type="text" value={info.product} ref="product" name="product" id="loadProduct" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadSalesRep" sm={2}>Sales Rep</Label>
          <Col sm={10}>
            <input type="text" value={info.salesRep} ref="salesRep" name="salesRep" id="loadSalesRep" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadQuantity" sm={2}>Quantity</Label>
          <Col sm={10}>
            <input type="text" value={info.quantity} ref="quantity" name="quantity" id="loadQuantity" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadEquipment" sm={2}>Equipment</Label>
          <Col sm={10}>
            <input type="text" value={info.equipment} ref="equipment" name="equipment" id="loadEquipment" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadCarrier" sm={2}>Carrier</Label>
          <Col sm={10}>
            <input type="text" value={info.carrier} ref="carrier" name="carrier" id="loadCarrier" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadPickupDate" sm={2}>Pickup Date</Label>
          <Col sm={10}>
            <input type="text" value={info.pickupDate} ref="pickupDate" name="pickupDate" id="loadPickupDate" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadDeliveryDate" sm={2}>Delivery Date</Label>
          <Col sm={10}>
            <input type="text" value={info.deliveryDate} ref="deliveryDate" name="deliveryDate" id="loadDeliveryDate" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadDestinationLocation" sm={2}>destinationLocation</Label>
          <Col sm={10}>
            <input type="text" value={info.destinationLocation} ref="destinationLocation" name="destinationLocation" id="loadDestinationLocation" onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="loadPickupLocation" sm={2}>Pickup Location</Label>
          <Col sm={10}>
            <input type="text" value={info.pickupLocation} ref="pickupLocation" name="pickupLocation" id="loadPickupLocation" onChange={this.handleChange} />
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




class Load extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewRecord: false,
      info : null
    }
    this.handleOpenList = this.handleOpenList.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);

  }


    // sets the state so that we know we are looking at a
    // particular record
    handleClick(info) {
      this.setState({
        isNewRecord: false,
        info: info
      });
    }

    async handleOpenList() {
      this.setState({
        isNewRecord: true,
        info: null
      });

      console.log("fetching open list");
      await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log('error ==>', err));
      this.props.history.push("/load");
    }

    handleOpenAdd() {
      this.setState({
        isNewRecord : true,
        info: blank_load
      });
    }


    renderDetail() {
      return(
        <div>
          <LoadPanel info={this.state.info}
                         isNewRecord={this.state.isNewRecord}
                         handleClose={this.handleOpenList} />
        </div>
      );
    }

  renderList() {
    return(
      <div>
        <div className="App-title">Load List &nbsp;&nbsp;
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
                        <LoadListDetail info={item} key={idx}
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


export default withRouter(Load);

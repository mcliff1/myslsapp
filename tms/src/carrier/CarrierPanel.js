/**
 * @file CarrierPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button } from 'reactstrap';


/**
 * expects handleSubmit function (isNew:boolean , data) to be passed
 */
class CarrierPanel extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();

    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    if (!this.props.isNew) {
      formData['Id'] = this.props.info.Id;
      //formData['ObjectType'] = this.props.info.ObjectType;
    }
    console.log('-->', formData);
    console.log('isNew -->', this.props.isNew);
    this.props.handleSubmit(this.props.isNew, formData);
  }




  render() {
    const info = this.props.info;
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>

        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <input type="text" defaultValue={info.name} ref="name" name="name"   />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="city" sm={2}>City</Label>
          <Col sm={10}>
            <input type="text" defaultValue={info.city} ref="city" name="city"  />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="state" sm={2}>State</Label>
          <Col sm={10}>
            <input type="text" defaultValue={info.state} ref="state" name="state"  />
          </Col>
        </FormGroup>


        <FormGroup row>
          {this.props.isNew ?
            <Button type="submit">Submit</Button> :
            <Button type="submit">Update</Button>
          }
          {  }
          <Button onClick={this.props.handleDelete}>Delete</Button>
          {  }
          <Button onClick={this.props.handleClose}>Close</Button>
        </FormGroup>
        </Form>
      </div>

    )
  };
}


export default CarrierPanel;

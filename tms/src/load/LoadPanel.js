/**
 * @file LoadPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button } from 'reactstrap';


class LoadPanel extends Component {

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

    if (!this.props.isNewLoad) {
      formData['Id'] = this.props.info.Id;
      //formData['ObjectType'] = this.props.info.ObjectType;
    }
    console.log('-->', formData);
    this.props.handleSubmit(this.props.isNewLoad, formData);
  }




  render() {
    const info = this.props.info;
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
          {this.props.isNewLoad ?
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


export default LoadPanel;

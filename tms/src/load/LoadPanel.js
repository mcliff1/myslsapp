/**
 * @file LoadPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button } from 'reactstrap';


/**
 * expects handleSubmit function (isNew:boolean , data) to be passed
 */
class LoadPanel extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    console.log('handle submit from LoadPanel');
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
          <Label for="status" sm={2}>Status</Label>
          <Col sm={10}>
            <input type="text" defaultValue={info.status} ref="status" name="status"   />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product" sm={2}>Product</Label>
          <Col sm={10}>
            <input type="text" defaultValue={info.product} ref="product" name="product"  />
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


export default LoadPanel;

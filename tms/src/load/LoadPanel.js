/**
 * @file LoadPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { FormGroup, Label, Col, Button } from 'reactstrap';
import { withFormik, Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';


/**
 * expectsA
 * handleSubmit function (isNew:boolean , data) to be passed
 *
 * <render prop accepts inner form componentn
 */
//class LoadPanel extends Component {
const InnerLoadPanel = ({ isNew, errors, handleClose, handleDelete }) => (
    <div>
      <Form>

        <FormGroup row>
          <Label for="status" sm={2}>Status</Label>
          <Col sm={10}>
            <Field type="text" name="status" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product" sm={2}>Product</Label>
          <Col sm={10}>
            <Field type="text" name="product" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="destination" sm={2}>Destination</Label>
          <Col sm={10}>
            <Field type="text" name="destination" />
          </Col>
        </FormGroup>

        <FormGroup row>
          {isNew ?
            <Button>Submit</Button> :
            <Button>Update</Button>
          }
          {  }
          <Button onClick={handleDelete}>Delete</Button>
          {  }
          <Button onClick={handleClose}>Close</Button>
        </FormGroup>
      </Form>
    </div>
)

/**
* can define function either direct, as with a
*   function: (args) => {exec}
*   function(args) { exec }
*/
const LoadPanel = withFormik({
  mapPropsToValues( { info } )  {
    return {
      status: (info && info.status) || 'default status',
      product: (info && info.product) || 'default product',
      destination: (info && info.destination) || 'default destination'
    }
  },
  handleSubmit: (values, formikBag) => {
    console.log(values);
    console.log(formikBag);
    formikBag.props.handleSubmit(formikBag.props.isNew, values);
  },
  displayName: 'LoadPanel', // helps with React DevTools
})(InnerLoadPanel)



export default LoadPanel;

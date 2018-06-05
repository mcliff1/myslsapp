/**
 * @file CustomerPanel.js
 * 'dumb' REACT component for detail customer CustomerPanel
 */
import React, { Component } from 'react';
import { FormGroup, Label, Col, Button } from 'reactstrap';
import { withFormik, Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';


const InnerCustomerPanel = ({ isNew, errors, handleClose, handleDelete }) => (

      <div>
        <Form>

        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={10}>
            <Field type="text" name="name" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Address</Label>
          <Col sm={10}>
            <Field type="text" name="address1" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Address2</Label>
          <Col sm={10}>
            <Field type="text" name="address2" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>City</Label>
          <Col sm={10}>
            <Field type="text" name="city" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>State</Label>
          <Col sm={10}>
            <Field type="text" name="state" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Zip</Label>
          <Col sm={10}>
            <Field type="text" name="zip" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Phone</Label>
          <Col sm={10}>
            <Field type="text" name="phone" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Fax</Label>
          <Col sm={10}>
            <Field type="text" name="fax" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Email</Label>
          <Col sm={10}>
            <Field type="email" name="email" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Website</Label>
          <Col sm={10}>
          <Field type="text" name="website" />
          </Col>
        </FormGroup>

        <FormGroup row>
          {isNew ?
            <Button type="submit">Submit</Button> :
            <Button type="submit">Update</Button>
          }
          {  }
          <Button onClick={handleDelete}>Delete</Button>
          {  }
          <Button onClick={handleClose}>Close</Button>
        </FormGroup>
        </Form>
      </div>

    )


const CustomerPanel = withFormik({
  mapPropsToValues( { info } )  {
    return {
      name: (info && info.name) || 'default name',
      address1: (info && info.address1) || '',
      address2: (info && info.address2) || '',
      city: (info && info.city) || 'default city',
      state: (info && info.state) || 'default state',
      zip: (info && info.zip) || '',
      phone: (info && info.phone) || '',
      fax: (info && info.fax) || '',
      email: (info && info.email) || '',
      website: (info && info.website) || '',
    }
  },
  handleSubmit(values, formikBag) {
    formikBag.props.handleSubmit(formikBag.props.isNew, values);
  },
  displayName: 'CustomerPanel', // helps with React DevTools
})(InnerCustomerPanel)


CustomerPanel.propTypes = {
  info: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired
};

export default CustomerPanel;

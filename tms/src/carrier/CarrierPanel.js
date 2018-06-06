/**
 * @file CarrierPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { FormGroup, Label, Col, Button } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';


const InnerCarrierPanel = ({ info, isNew, touched, errors, handleClose, handleDelete }) =>
(
      <div>
        <Form>
          <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>
              <Field type="text" name="name" />
              {touched.name && errors.name && <div>{errors.name}</div>}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Phone</Label>
            <Col sm={10}>
              <Field type="text" name="phone" />
              {touched.phone && errors.phone && <div>{errors.phone}</div>}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>City</Label>
            <Col sm={10}>
              <Field type="text" name="city" />
              {touched.city && errors.city && <div>{errors.city}</div>}
            </Col>
          </FormGroup>

            <FormGroup row>
              <Label sm={2}>State</Label>
              <Col sm={10}>
                <Field type="text" name="state" />
                {touched.state && errors.state && <div>{errors.state}</div>}
              </Col>
            </FormGroup>


          {isNew ?
          <div>
            <Button>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </div>
          :
          <div>
            <Button>Update</Button>
            <Button onClick={() => handleDelete(info.Id)}>Delete</Button>
            <Button onClick={handleClose}>Close</Button>
          </div>
          }
        </Form>
      </div>
)



const CarrierPanel = withFormik({
  mapPropsToValues: ( { info } )  => ({
      name: (info && info.name) || 'default name',
      city: (info && info.city) || 'default city',
      state: (info && info.state) || 'default state',
      phone: (info && info.phone) || '',
  }),
  handleSubmit: (values, formikBag) => {
    formikBag.props.handleSubmit(formikBag.props.isNew, values);
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
            .min(7, 'min 7 digits')
            .max(11, 'max 11 digits')
            .required('phone is required')
  }),
  displayName: 'CarrierPanel', // helps with React DevTools
})(InnerCarrierPanel)


CarrierPanel.propTypes = {
  info: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired
};

export default CarrierPanel;

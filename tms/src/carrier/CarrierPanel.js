/**
 * @file CarrierPanel.js
 * 'dumb' REACT component for detail load information
 */
import React, { Component } from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';




/**
 * expects handleSubmit function (isNew:boolean , data) to be passed
 */
//class rawCarrierPanel extends Component {
const InnerCarrierPanel = ({ isNew, errors }) =>
(
      <div>
        <Form>
          {errors.name && <div>{errors.name}</div>}
          <label>Name
            <Field type="text" name="name" />
          </label><br />
          <label>City
            <Field type="text" name="city" />
          </label><br />
          <label>State
            <Field type="text" name="state" />
          </label><br />


          {isNew ?
            <button>Submit</button> :
            <button>Update</button>
          }
          {  }
          { /* <Button onClick={this.props.handleDelete}>Delete</Button> */ }
          {  }
          { /* <Button onClick={this.props.handleClose}>Close</Button> */ }
        </Form>
      </div>
)



const CarrierPanel = withFormik({
  mapPropsToValues( { info } )  {
    return {
      name: (info && info.name) || 'default name',
      city: (info && info.city) || 'default city',
      state: (info && info.state) || 'default state'
    }
  },
  handleSubmit(values, formikBag) {
    console.log(values);
    console.log(formikBag);
    this.props.myHandleSubmit(this.props.isNew, values);
  },
  displayName: 'CarrierPanel', // helps with React DevTools
  handleSpecial: () => {
    return this.props.myHandleSubmit(this.props.isNew)
  }
})(InnerCarrierPanel)


CarrierPanel.propTypes = {
  info: PropTypes.object.isRequired,
  myHandleSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired
};

export default CarrierPanel;

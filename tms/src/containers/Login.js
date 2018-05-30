import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Form, FormGroup, Label, Col, Button, Input } from 'reactstrap';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading:true});
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch(e) {
      alert(e.message);
      this.setState({isLoading:false});
    }
  }

  render() {
    return(
      <div className="Login">

      <Form onSubmit={this.handleSubmit}>

      <FormGroup row>
        <Label for="custName" sm={2}>Email</Label>
        <Col sm={10}>
          <Input autoFocus id="email" onChange={this.handleChange} type="email" value={this.state.email}  />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="custName" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password" id="password" onChange={this.handleChange} value={this.state.password}  />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Button type="submit">Submit</Button>
      </FormGroup>
      </Form>

      </div>
    )
  }
}

import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Button, Input } from 'reactstrap';
import { Auth } from 'aws-amplify';
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null
    };
  }

  validateForm() {
     return (
       this.state.email.length > 0 &&
       this.state.password.length > 0 &&
       this.state.password === this.state.confirmPassword
     );
   }

   validateConfirmationForm() {
   return this.state.confirmationCode.length > 0;
 }

 handleChange = event => {
   this.setState({
     [event.target.id]: event.target.value
   });
 }

 handleSubmit = async event => {
   event.preventDefault();

   this.setState({ isLoading: true });

   try {
     const newUser = await Auth.signUp({
       username: this.state.email,
       password: this.state.password
     });
     this.setState({
       newUser
     });
   } catch (e) {
     alert(e.message);
   }

   this.setState({ isLoading: false });
 }

 handleConfirmationSubmit = async event => {
   event.preventDefault();

   this.setState({ isLoading: true });

   try {
     await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
     await Auth.signIn(this.state.email, this.state.password);

     this.props.userHasAuthenticated(true);
     this.props.history.push("/");
   } catch (e) {
     alert(e.message);
     this.setState({ isLoading: false });
   }
 }

 renderConfirmationForm() {

   return(
     <div>
       <Form onSubmit={this.handleConfirmationSubmit}>
         <FormGroup row>
           <Label sm={4}>Confirmation Code</Label>
           <Col sm={8}>
             <Input autoFocus id="confirmationCode" onChange={this.handleChange} type="tel" value={this.state.confirmationCode}  />
           </Col>
         </FormGroup>
         <FormGroup row>
           <Button type="submit">Submit</Button>
         </FormGroup>
       </Form>
     </div>
   );
 }



renderForm() {
  return(
    <div>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup row>
        <Label sm={4}>Email</Label>
        <Col sm={8}>
          <Input autoFocus id="email" onChange={this.handleChange} type="email" value={this.state.email}  />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={4}>Password</Label>
        <Col sm={8}>
          <Input  id="password" onChange={this.handleChange} type="password" value={this.state.password}  />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={4}>Confirm Password</Label>
        <Col sm={8}>
          <Input  id="confirmPassword" onChange={this.handleChange} type="password" value={this.state.confirmPassword}  />
        </Col>
      </FormGroup>
        <FormGroup row>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
    </div>

  );
}

  render() {
    return(
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm() }
      </div>
    );
  }



}

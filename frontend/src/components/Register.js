import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, browserHistory, Redirect, withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);

    this.state = {
      email:'',
      password:'',
      phoneNumber: '',
      showRegistration: false
    };
  }

  componentDidMount(){

  }

  handleEmailInput(event){
    this.setState({email: event.target.value});
  }

  handlePhoneInput(event){
    this.setState({phoneNumber: event.target.value});
  }

  handlePasswordInput(event){
    this.setState({password: event.target.value});
  }

  showLogin = () =>{
    this.props.history.push('/login')
  }


  handleRegister = (event) => {
    axios.post('users/register', {
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    })
    .then((response) => {
      this.props.updateSignIn({email:response.data.email, owner:response.data.owner})
      this.props.showRegistration();
    })
    .catch((error) => {
      this.props.alert.show("User already exists");
    });
    event.preventDefault();
  }


  render() {
    return (
      <Form>
        <h1>Register</h1>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" value={this.state.value} onChange={this.handleEmailInput}  id="exampleEmail" placeholder="Your email" />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone #</Label>
          <Input type="phoneNumber" name="phoneNumber" value={this.state.value}  onChange={this.handlePhoneInput} id="phoneNumber" placeholder="Your phone #" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" value={this.state.value}  onChange={this.handlePasswordInput} id="examplePassword" placeholder="Your password" />
        </FormGroup>
        <Button onClick={this.handleRegister}>Register</Button>
        <Button onClick={this.showLogin}>Login</Button>

      </Form>
    );
  }
}
export default withRouter(withAlert(Register));

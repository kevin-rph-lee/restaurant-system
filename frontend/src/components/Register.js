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
    this.state = {
      email:'',
      password1:'',
      password2: '',
      showRegistration: false
    };
  }

  componentDidMount(){

  }



  handleEmailInput = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordInput1 = (event) => {
    this.setState({password1: event.target.value});
  }

  handlePasswordInput2 = (event) => {
    this.setState({password2: event.target.value});
  }

  showLogin = () =>{
    this.props.history.push('/login')
  }


  handleRegister = (event) => {

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
      this.props.alert.show("Not valid email format");
    }

    if(this.state.password1 === this.state.password2){
      axios.post('users/register', {
        email: this.state.email,
        password: this.state.password1,
        phoneNumber: this.state.phoneNumber
      })
      .then((response) => {
        this.props.updateSignIn({email:response.data.email, owner:response.data.owner})
        this.props.showRegistration();
      })
      .catch((error) => {
        this.props.alert.show("User already exists");
      });
    } else {
      this.props.alert.show("Passwords don't match");
    }



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
          <Label for="password1">Password</Label>
          <Input type="password" name="password1" value={this.state.value}  onChange={this.handlePasswordInput1} id="password1" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirm Password</Label>
          <Input type="password" name="password2" value={this.state.value}  onChange={this.handlePasswordInput2} id="password2" placeholder="Confirm Password" />
        </FormGroup>
        <Button onClick={this.handleRegister}>Register</Button>
        <Button onClick={this.showLogin}>Login</Button>

      </Form>
    );
  }
}
export default withRouter(withAlert(Register));

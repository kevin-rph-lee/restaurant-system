import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, browserHistory, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email:'',
      password:'',
      showRegistration: false,
      signedIn:false
    };
  }

  componentDidMount(){
    console.log('Props: ', this.props);
  }

  handleEmailInput(event){
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event){
    this.setState({password: event.target.value});
  }


  handleLogin = (event) => {
    axios.post('users/login', {
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    })
    .then((response) => {
      console.log(response.data);
      this.props.updateSignIn({email:response.data.email, owner:response.data.owner});
      this.setState({signedIn:true});
    })
    .catch((error) => {
      console.log('ERror! ', error);
    });
    event.preventDefault();
  }


  render() {
    if(this.state.signedIn === true){
      console.log('attempting')
      return(<Redirect to='/menu' />)
    }

    return (
      <Form>
        <h1>Login</h1>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" value={this.state.value} onChange={this.handleEmailInput}  id="exampleEmail" placeholder="Your email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" value={this.state.value}  onChange={this.handlePasswordInput} id="examplePassword" placeholder="Your password" />
        </FormGroup>
        <Button onClick={this.handleLogin}>Login</Button>

      </Form>
    );
  }
}
export default Login;

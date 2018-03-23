import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, browserHistory, Redirect, withRouter  } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      emailInput:'',
      password:'',
      showRegistration: false,
      signedIn:false
    };
  }

  componentDidMount(){
    console.log('email in login.js: ', this.props.email)
    console.log('Props in login.js: ', this.props)
  }

  handleEmailInput(event){
    this.setState({emailInput: event.target.value});
  }

  handlePasswordInput(event){
    this.setState({password: event.target.value});
  }

  showRegistration = () =>{
    this.props.history.push('/register')
  }


  handleLogin = (event) => {
    axios.post('users/login', {
      email: this.state.emailInput,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    })
    .then((response) => {
      console.log(response.data);
      this.props.updateSignIn({email:response.data.email, owner:response.data.owner});
      if(response.data.owner === true){
        this.props.history.push('/ownerview');
      } else {
        this.props.history.push('/menu');
      }

    })
    .catch((error) => {
      console.log('ERror! ', error);
    });
    event.preventDefault();
  }


  render() {
    console.log('Login props: ', this.props);
    if( (this.props.email !== 'Guest') && this.props.owner === false ){
      console.log('WHy?')
      return(<Redirect to='/menu' />)
    }

    if( (this.props.email !== 'Guest') && this.props.owner === true ){
      return(<Redirect to='/ownerview' />)
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
        <Button onClick={this.showRegistration}>Register</Button>
      </Form>
    );
  }
}
export default withRouter(Login);

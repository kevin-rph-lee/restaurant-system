import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


class Login extends Component {
  constructor(props) {
    super(props);
    // this.signIn = this.signIn.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email:'',
      password:''
    };
  }

  componentDidMount(){

  }

  // signIn(){
  //   axios.post('/signin', {
  //     email: this.state.email,
  //     password: this.state.password
  //   })
  //   .then(function (response) {

  //   })
  //   .catch(function (error) {
  //     console.log('error!');
  //   });
  // }

  handleEmailInput(event){
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event){
    this.setState({password: event.target.value});
  }


  handleSubmit(event) {
    alert('Email: ' + this.state.email + ' Password ' + this.state.password);
    event.preventDefault();
  }


  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" value={this.state.value} onChange={this.handleEmailInput}  id="exampleEmail" placeholder="Your email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" value={this.state.value}  onChange={this.handlePasswordInput} id="examplePassword" placeholder="Your password" />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}
export default Login;

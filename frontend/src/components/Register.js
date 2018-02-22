import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email:'',
      password:'',
      showRegistration: false
    };
  }

  componentDidMount(){

  }

  handleEmailInput(event){
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event){
    this.setState({password: event.target.value});
  }


  handleSubmit = (event) => {
    console.log(this.props.updateSignIn);
    alert('Email: ' + this.state.email + ' Password ' + this.state.password);
    axios.post('users/register', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      console.log(response.data);
      this.props.updateSignIn(response.data)
    })
    .catch((error) => {
      console.log('ERror! ', error);
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
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" value={this.state.value}  onChange={this.handlePasswordInput} id="examplePassword" placeholder="Your password" />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
        <Button onClick={this.props.showRegistration}>Login</Button>

      </Form>
    );
  }
}
export default Register;

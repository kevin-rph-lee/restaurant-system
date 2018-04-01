import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, browserHistory, Redirect, withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1:'',
      password2: ''
    };
  }

  componentDidMount(){

  }

  handlePasswordInput1 = (event) => {
    this.setState({password1: event.target.value});
  }

  handlePasswordInput2 = (event) => {
    this.setState({password2: event.target.value});
  }


  handleSubmit = (event) => {

    if(this.state.password1 === this.state.password2){
      axios.post('users/update', {
        password: this.state.password1,
        phoneNumber: this.state.phoneNumber
      })
      .then((response) => {
        this.props.history.push('/menu')
      })
      .catch((error) => {
        console.log("error! ", error)
      });
    } else {
      this.props.alert.show("Passwords don't match");
    }
  }


  render() {
    return (
      <Form>
        <h1>Update Password</h1>
        <FormGroup>
          <Label for="password1">Password</Label>
          <Input type="password" name="password1" value={this.state.value}  onChange={this.handlePasswordInput1} id="password1" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirm Password</Label>
          <Input type="password" name="password2" value={this.state.value}  onChange={this.handlePasswordInput2} id="password2" placeholder="Confirm Password" />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Update</Button>

      </Form>
    );
  }
}
export default withRouter(withAlert(UserProfile));

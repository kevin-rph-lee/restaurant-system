import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table, Form, Input, Label, FormGroup} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'
import ReactModal from 'react-modal';
import { withAlert } from 'react-alert'
import FontAwesome from 'react-fontawesome'
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, Redirect, withRouter} from 'react-router-dom';



class AddMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {

  }

  handleNameChange = (event) => {
    this.setState({name:event.target.value});
  }

  handlePriceChange = (event) => {
    console.log(event.target.value);
    this.setState({price:event.target.value});
  }

  handleDescriptionChange = (event) => {
    this.setState({description:event.target.value});
  }


  render() {
    console.log(this.state.selectedItem);
    if(this.props.owner === false){
      return(<Redirect to='/login' />)
    }
    return(
      <div>
        <h1>Add a new menu item</h1>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="New Name" onChange = {this.handleNameChange} />
          <Label for="price">price</Label>
          <Input type="number" name="price" id="price" onChange = {this.handlePriceChange} />
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" placeholder="Description" onChange = {this.handleDescriptionChange} />
        </FormGroup>
      </div>

    )


  }

}
export default withRouter(withAlert(AddMenuItem));

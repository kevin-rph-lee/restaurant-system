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
      description: '',
      selectedFile: null
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

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
  }

  handleSubmit = () => {
    console.log('State: ', this.state)

    // if((this.state.price !== '')){
    //   console.log('WHHHHYYY')
    //   if(isNaN(parseFloat(this.state.price).toFixed(2)) && (this.state.price === null || this.state.price === '')){
    //     console.log('nan')
    //     this.props.alert.show('Invalid input! Price not a number!');
    //     return;
    //   }
    // }


    // axios.post('menu_items/' + this.state.selectedItem.id, {
    //   name:this.state.name,
    //   description:this.state.description,
    //   price:parseFloat(this.state.price).toFixed(2),
    //   soldOut: this.state.soldOut
    // })
    // .then((response) => {

    //   axios.get('menu_items/', {

    //   })
    //   .then((response) => {
    //     this.setState({items:response.data});
    //     this.setState({selectedItem:{}})
    //     this.props.alert.show('Update successful!');
    //   })
    //   .catch((error) => {
    //     console.log('error is ',error);
    //   })

    // })
    // .catch((error) => {
    //   console.log('error is ',error);
    // })

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
          <Label for="image">Image</Label>
          <Input name="image" type="file" onChange={this.fileChangedHandler} />
          <Button onClick = {this.handleSubmit}>Submit!</Button>
        </FormGroup>
      </div>

    )


  }

}
export default withRouter(withAlert(AddMenuItem));

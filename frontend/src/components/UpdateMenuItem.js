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



class UpdateMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItem: {},
      name: '',
      price: '',
      description: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {

      axios.get('menu_items/', {

      })
      .then((response) => {
        this.setState({items: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })

  }


  handleDropDownChange = (event) => {
    if(event.target.value === 'Select an Item'){
      this.setState({selectedItem:{}});
      return;
    }
    console.log(event.target.value)
    for(let i = 0; i < this.state.items.length; i ++){
      if(this.state.items[i].name === event.target.value){
        this.setState({selectedItem:this.state.items[i]});
      }
    }
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

  handleSubmit = () => {
    console.log('Price: ', this.state.price)

    if((this.state.price !== '')){
      console.log('WHHHHYYY')
      if(isNaN(parseFloat(this.state.price).toFixed(2)) && (this.state.price === null || this.state.price === '')){
        console.log('nan')
        this.props.alert.show('Invalid input! Price not a number!');
        return;
      }
    }

    for(let i = 0; i < this.state.items.length; i ++){
      if(this.state.name.toLowerCase() === this.state.items[i].name.toLowerCase()){
        this.props.alert.show('Invalid input! Item name already exists');
        return;
      }
    }

    axios.post('menu_items/' + this.state.selectedItem.id, {
      name:this.state.name,
      description:this.state.description,
      price:parseFloat(this.state.price).toFixed(2)

    })
    .then((response) => {

      axios.get('menu_items/', {

      })
      .then((response) => {
        this.setState({items:response.data});
        this.setState({selectedItem:{}})
        this.props.alert.show('Update successful!');
      })
      .catch((error) => {
        console.log('error is ',error);
      })

    })
    .catch((error) => {
      console.log('error is ',error);
    })

  }

  render() {

    if(this.props.owner === false){
      return(<Redirect to='/login' />)
    }

    let items = this.state.items.map(item => {
      return (

            <option>{item.name}</option>

      )
    })

    let menuItemPreview = null;
    if(this.state.selectedItem.name === undefined){
      menuItemPreview = null
    } else {
      menuItemPreview =
        <div>
          <Card className="menu-card">
            <CardBody>
              <CardTitle>{this.state.selectedItem.name}</CardTitle>
              <CardSubtitle>${this.state.selectedItem.price}</CardSubtitle>
              <img src={this.state.selectedItem.image} alt="Card image cap" />
              <CardText>{this.state.selectedItem.description}</CardText>
            </CardBody>
          </Card>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="New Name" onChange = {this.handleNameChange} />
            <Label for="price">price</Label>
            <Input type="number" name="price" id="price" onChange = {this.handlePriceChange} />
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description" placeholder="Description" onChange = {this.handleDescriptionChange} />
          </FormGroup>
          <Button onClick = {this.handleSubmit}>Submit!</Button>
        </div>
    }

    return (
      <div>
        <h1>Update a menu item</h1>
        <FormGroup>
          <Label for="exampleSelect">Item</Label>
          <Input type="select" name="select" onChange={this.handleDropDownChange} id="exampleSelect">
            <option>Select an Item</option>
            {items}
          </Input>
        </FormGroup>
        {menuItemPreview}
      </div>
    )
  }
}
export default withRouter(withAlert(UpdateMenuItem));

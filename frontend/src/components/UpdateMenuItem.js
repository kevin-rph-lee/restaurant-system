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
      description: '',
      soldOut:'',
      selectedFile: null,
      type: null,
      prepTime: ''
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
        this.setState({soldOut:this.state.items[i].sold_out})
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

  handlePrepTimeChange = (event) => {
    this.setState({prepTime:parseInt(Math.round(event.target.value))});
  }

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
  }

  handleSoldOutChange = (event) => {
    this.setState({soldOut:!this.state.soldOut})
  }

  handleDropDownTypeChange = (event) => {
    if(event.target.value === 'Select a category'){
      this.setState({type:null});
    }
    this.setState({type:event.target.value.toLowerCase()});
  }


  handleSubmit = () => {
    console.log('Submit!')
    console.log('Name, ', this.state.name)
    console.log('Price: ', this.state.price)
    let price = this.state.price;
    let prepTime = this.state.prepTime;
    const id = this.state.selectedItem.id;
    if(this.state.price !== ''){
      price = parseFloat(this.state.price).toFixed(2);
    }



    for(let i = 0; i < this.state.items.length; i ++){
      if(this.state.name.toLowerCase() === this.state.items[i].name.toLowerCase()){
        this.props.alert.show('Invalid input! Item name already exists');
        return;
      }
    }

    axios.post('menu_items/update/' + this.state.selectedItem.id, {
      name:this.state.name,
      description:this.state.description,
      price:price,
      soldOut: this.state.soldOut,
      type: this.state.type,
      prepTime: this.state.prepTime
    })
    .then((updatedItem) => {



      axios.get('menu_items/', {

      })
      .then((response) => {

        if(this.state.selectedFile !== null){

            const data = new FormData()
            data.append('file', this.state.selectedFile);

            axios.post('menu_items/add/image/' + id, data)
            .then((response) => {
              console.log('ID: ',response.data.id)
              this.setState({items:response.data});
              this.setState({selectedItem:{}})
              this.props.alert.show('Update successful!');
            })
            .catch((error) => {
              console.log('error is ',error);
            })

        } else {
          this.setState({items:response.data});
          this.setState({selectedItem:{}})
          this.props.alert.show('Update successful!');
        }
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
    console.log('Selected Item: ', this.state.selectedItem);
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
          <Card className="update-card">
            <CardBody>
              <CardTitle>{this.state.selectedItem.name}</CardTitle>
              <CardSubtitle>Type</CardSubtitle>
              <CardText>{this.state.selectedItem.type}</CardText>
              <CardSubtitle>Price</CardSubtitle>
              <CardText>${this.state.selectedItem.price}</CardText>
              <CardSubtitle>Prep Time</CardSubtitle>
              <CardText>{this.state.selectedItem.prep_time} minutes</CardText>
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
            <Label for="prep-time">Prep time</Label>
            <Input type="number" name="prep-time" id="prep-time" onChange = {this.handlePrepTimeChange} />
            <Label for="image">Image</Label>
            <Input type="select" name="select" onChange={this.handleDropDownTypeChange} id="type">
              <option>Select a category</option>
              <option>Main</option>
              <option>Drink</option>
              <option>Side</option>
            </Input>
            <Input name="image" type="file" onChange={this.fileChangedHandler} />
          </FormGroup>

          <FormGroup row>
            <Label for="checkbox2">Sold Out</Label>
            <input type="checkbox" id="checkbox2" checked={this.state.soldOut} onChange = {this.handleSoldOutChange} />

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

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
      selectedFile: null,
      type: null,
      prepTime: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {

  }

  handleNameChange = (event) => {
    this.setState({name:event.target.value});
  }

  handleDropDownChange = (event) => {
    if(event.target.value === 'Select a category'){
      this.setState({type:null});
    }
    this.setState({type:event.target.value});
  }

  handlePrepTimeChange = (event) => {
    this.setState({prepTime:parseInt(Math.round(event.target.value))});
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

    if(this.state.type === null){
      this.props.alert.show('Invalid input! New item needs a category!');
      return;
    }


    console.log('State: ', this.state)

    axios.post('menu_items/add', {
      name:this.state.name,
      price:parseFloat(this.state.price).toFixed(2),
      description:this.state.description,
      type:this.state.type.toLowerCase(),
      prepTime: this.state.prepTime
    })
    .then((response) => {
      console.log('New ID:', response.data.id)

      const data = new FormData()
      data.append('file', this.state.selectedFile);

      axios.post('menu_items/add/image/' + response.data.id, data)
      .then((response) => {
        console.log('Success!')
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
          <Label for="prep-time">Prep time</Label>
          <Input type="number" name="prep-time" id="prep-time" onChange = {this.handlePrepTimeChange} />
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" placeholder="Description" onChange = {this.handleDescriptionChange} />
          <Label for="image">Image</Label>
          <Input type="select" name="select" onChange={this.handleDropDownChange} id="type">
            <option>Select a category</option>
            <option>Main</option>
            <option>Drink</option>
            <option>Side</option>
          </Input>
          <Input name="image" type="file" onChange={this.fileChangedHandler} />
          <Label for="type">Dish Type</Label>

          <Button onClick = {this.handleSubmit}>Submit!</Button>
        </FormGroup>
      </div>

    )


  }

}
export default withRouter(withAlert(AddMenuItem));

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
      selectedItem: {}
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
    console.log(event.target.value)
    for(let i = 0; i < this.state.items.length; i ++){
      if(this.state.items[i].name === event.target.value){
        this.setState({selectedItem:this.state.items[i]});
      }
    }
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
    console.log('Selecte item: ', this.state.selectedItem)
    if(this.state.selectedItem.name === undefined){
      console.log('Selected')
      menuItemPreview = null
    } else {
      menuItemPreview =
        <Card className="menu-card">
          <CardBody>
            <CardTitle>{this.state.selectedItem.name}</CardTitle>
            <CardSubtitle>${this.state.selectedItem.price}</CardSubtitle>
            <img src={this.state.selectedItem.image} alt="Card image cap" />
            <CardText>{this.state.selectedItem.description}</CardText>
          </CardBody>
        </Card>
    }

    return (
      <div>
        <h1>Update a menu item</h1>
        <FormGroup>
          <Label for="exampleSelect">Item</Label>
          <Input type="select" name="select" onChange={this.handleDropDownChange} id="exampleSelect">
            {items}
          </Input>
        </FormGroup>
        {menuItemPreview}
      </div>
    )
  }
}
export default withRouter(withAlert(UpdateMenuItem));

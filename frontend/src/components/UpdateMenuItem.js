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
      items: []
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

  render() {

    if(this.props.owner === false){
      return(<Redirect to='/login' />)
    }

    let items = this.state.items.map(item => {
      return (

            <option>{item.name}</option>

      )
    })

    return (
      <div>
        <h1>Update a menu item</h1>
        <FormGroup>
          <Label for="exampleSelect">Item</Label>
          <Input type="select" name="select" id="exampleSelect">
            {items}
          </Input>
        </FormGroup>
      </div>
    )
  }
}
export default withRouter(withAlert(UpdateMenuItem));

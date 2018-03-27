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

    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {

  }


  render() {
    console.log(this.state.selectedItem);
    if(this.props.owner === false){
      return(<Redirect to='/login' />)
    }
    return(
      <div>
        <h1>Add a new menu item</h1>
      </div>

    )


  }

}
export default withRouter(withAlert(AddMenuItem));

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


class ReportsView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount(){
    axios.get('orders/report/mains', {

    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log('error is ',error);
    })

    axios.get('orders/report/drinks', {

    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log('error is ',error);
    })


    axios.get('orders/report/sides', {

    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log('error is ',error);
    })


  }

  render() {
    return (
      <h2>Profit Reports</h2>
    );
  }
}
export default ReportsView;

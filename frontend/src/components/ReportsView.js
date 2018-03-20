import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table} from 'reactstrap';
import axios from 'axios'
import {BarChart} from 'react-easy-chart';



class ReportsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainsData:[],
      drinksData:[],
      sidesData: [],
      mainsRevenue:[],
      drinksRevenue:[],
      sidesRevenue:[]
    };
  }

  componentDidMount(){


    axios.get('orders/revenue_report/mains', {

    })
    .then((response) => {
      const mains = this.state.mains;
      this.setState({mainsRevenue:response.data});

    })
    .catch((error) => {
      console.log('error is ',error);
    })

    axios.get('orders/revenue_report/drinks', {

    })
    .then((response) => {
      const drinks = this.state.drinks;
      this.setState({drinksRevenue:response.data});
    })
    .catch((error) => {
      console.log('error is ',error);
    })


    axios.get('orders/revenue_report/sides', {

    })
    .then((response) => {
      const sides = this.state.sides;
      this.setState({sidesRevenue:response.data});
    })
    .catch((error) => {
      console.log('error is ',error);
    })


  }

  render() {


    return (
      <div>
        <h2>Mains</h2>
        <Container fluid>
          <h3>Revenue</h3>
          <Row>
            <BarChart
              axes
              colorBars
              data={this.state.mainsRevenue}
            />
          </Row>

          <h3>Sales</h3>
          <Row>

          </Row>
        </Container>
        <h2>Sides</h2>
        <Container fluid>
          <h3>Revenue</h3>
          <Row>
            <BarChart
              axes
              colorBars
              data={this.state.sidesRevenue}
            />
          </Row>

          <h3>Sales</h3>
          <Row>

          </Row>
        </Container>
        <h2>Drinks</h2>
        <Container fluid>
          <h3>Revenue</h3>
          <Row>
            <BarChart
              axes
              colorBars
              data={this.state.drinksRevenue}
            />
          </Row>

          <h3>Sales</h3>
          <Row>

          </Row>
        </Container>
      </div>
    );
  }
}
export default ReportsView;

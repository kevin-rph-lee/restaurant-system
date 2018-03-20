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
      mains:[],
      drinks:[],
      sides:[]
    };
  }

  componentDidMount(){


    axios.get('orders/report/mains', {

    })
    .then((response) => {
      const mains = this.state.mains;
      for(let i in response.data){
        mains.push({text:i,value:response.data[i]})
      }
      console.log('Mains: ',mains);
      this.setState({mains:mains});

    })
    .catch((error) => {
      console.log('error is ',error);
    })

    axios.get('orders/report/drinks', {

    })
    .then((response) => {
      const drinks = this.state.drinks;
      for(let i in response.data){
        drinks.push({text:i,value:response.data[i]})
      }
      console.log(drinks);
      this.setState({drinks:drinks});
    })
    .catch((error) => {
      console.log('error is ',error);
    })


    axios.get('orders/report/sides', {

    })
    .then((response) => {
      const sides = this.state.sides;
      for(let i in response.data){
        sides.push({text:i,value:response.data[i]})
      }
      console.log(sides);
      this.setState({sides:sides});
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
              axisLabels={{x: 'Revenue'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 46
                },
                {
                  x: 'B',
                  y: 96
                }
              ]}
            />
          </Row>

          <h3>Sales</h3>
          <Row>
            <BarChart
              axisLabels={{x: 'Sales'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 79
                },
                {
                  x: 'B',
                  y: 26
                }
              ]}
            />
          </Row>
        </Container>
        <h2>Sides</h2>
        <Container fluid>
          <h3>Revenue</h3>
          <Row>
            <BarChart
              axisLabels={{x: 'Revenue'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 46
                },
                {
                  x: 'B',
                  y: 96
                }
              ]}
            />
          </Row>

          <h3>Sales</h3>
          <Row>
            <BarChart
              axisLabels={{x: 'Sales'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 79
                },
                {
                  x: 'B',
                  y: 26
                }
              ]}
            />
          </Row>
        </Container>
        <h2>Drinks</h2>
        <Container fluid>
          <h3>Revenue</h3>
          <Row>
            <BarChart
              axisLabels={{x: 'Revenue'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 46
                },
                {
                  x: 'B',
                  y: 96
                }
              ]}
            />
          </Row>

          <h3>Sales</h3>
          <Row>
            <BarChart
              axisLabels={{x: 'Sales'}}
              axes
              data={[
                {
                  x: 'A',
                  y: 79
                },
                {
                  x: 'B',
                  y: 26
                }
              ]}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
export default ReportsView;

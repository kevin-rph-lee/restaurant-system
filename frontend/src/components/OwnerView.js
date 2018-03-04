import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table, CardHeader, CardFooter } from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'
import ReactCountdownClock from 'react-countdown-clock'




class OwnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }



  componentDidMount = () => {
      axios.get('orders/', {
      })
      .then((response) => {
        let ordersData = response.data.reverse();
        this.setState({orders: response.data})
      })
      .catch((error) => {

      })

     this.props.socket.addEventListener('message', (event) => {
        const newOrder = JSON.parse(event.data);
        const newOrdersArray = this.state.orders;
        newOrdersArray.unshift(newOrder);
        console.log('new state ',newOrdersArray);
        this.setState({orders: newOrdersArray});
      });


  }




  render() {
    let orderCards = this.state.orders.map(order => {
      return (
          <Col md="12" className="order-card">
            <Card >
              <CardHeader tag="h3">Order # {order.id}</CardHeader>
              <CardBody>
                <CardText>Finish time: {order.finishTime}</CardText>
                <CardText>Account: {order.email}</CardText>
                <ReactCountdownClock seconds={60}
                     color="#000"
                     alpha={0.9}
                     size={200}
                     />
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Item total price</th>
                    </tr>
                  </thead>
                  <tbody>
                      {order['orderedItems'].map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalItemPrice}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>Total order price: ${order.totalOrderPrice}</CardFooter>
            </Card>
          </Col>
      )
    })

    return (
      <div>
        <h2>Orders</h2>
        <Container fluid>
          <Row>
            {orderCards}
          </Row>
        </Container>
      </div>
    )
  }
}
export default OwnerView;

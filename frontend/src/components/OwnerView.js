import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table, CardHeader, CardFooter } from 'reactstrap';
import axios from 'axios'



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
          //Getting the time differences for all of the orders
          axios.get('orders/time', {
          })
          .then((response) => {
            const orderInfo = this.state.orders;
            for(let i = 0; i < response.data.length; i++){
              for(let y = 0; y < orderInfo.length; y ++){
                if(parseInt(response.data[i].id) === parseInt(orderInfo[y].id)){
                  orderInfo[y].timeDiff = response.data[i].timeDiff;
                  if(response.data[i].timeDiff === 0){
                    orderInfo[y].timeStatus = 'time-up';
                  }
                }
              }
            }
            console.log('ORder info ', orderInfo)
            this.setState({orders:orderInfo});

          })
          .catch((error) => {

          })
      })
      .catch((error) => {

      })
      //Listening for newly created orders
      this.props.socket.addEventListener('message', (event) => {
         const newOrder = JSON.parse(event.data);
         const newOrdersArray = this.state.orders;
         //Grabbing the time difference for the newest order
         axios.get('orders/time/' + newOrder.id, {
           })
           .then((response) => {
             newOrder['timeDiff'] = response.data;
             newOrdersArray.unshift(newOrder);
             this.setState({orders: newOrdersArray});
           })
           .catch((error) => {

           })

      });

      setInterval(
          () => this.tick(),
          60000
        );
  }

  //De-incrementing all of the orders
  tick = () => {
    const orders = this.state.orders;
    for(let i = 0; i < orders.length; i ++){
      console.log('order id: ', orders[i].id);
      if(orders[i].timeDiff !== 0){
        orders[i].timeDiff --;
      }
    }
    this.setState({orders:orders});
  }


  render() {
    let orderCards = this.state.orders.map(order => {
      console.log('Finish time: ', order.finishTime)
      const finishTime = order.finishTime;
      return (
          <Col md="12" className="order-card">
            <Card >
              <CardHeader tag="h3" >Order # {order.id}</CardHeader>
              <CardBody>
                <CardText>Finish time: {order.finishTime}</CardText>
                <CardText>Account: {order.email}</CardText>
                <CardText ><span className={order.timeStatus}>Time left: {order.timeDiff}</span></CardText>
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
        <Button onClick={this.tick}>test</Button>
      </div>
    )
  }
}
export default OwnerView;

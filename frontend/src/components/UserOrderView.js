import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table, CardHeader, CardFooter } from 'reactstrap';
import axios from 'axios'



class UserOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }



  componentDidMount = () => {
      // axios.get('orders/', {
      // })
      // .then((response) => {
      //   let ordersData = response.data.reverse();
      //   this.setState({orders: response.data})
      //     //Getting the time differences for all of the orders
      //     axios.get('orders/time', {
      //     })
      //     .then((response) => {
      //       const orderInfo = this.state.orders;
      //       for(let i = 0; i < response.data.length; i++){
      //         for(let y = 0; y < orderInfo.length; y ++){
      //           //Assiging the time diff to the order
      //           if(parseInt(response.data[i].id) === parseInt(orderInfo[y].id)){
      //             orderInfo[y].timeDiff = response.data[i].timeDiff;
      //             //Assigning a class to the time left span depending on how much time is left on the order
      //             if(response.data[i].timeDiff === 0){
      //               orderInfo[y].timeStatus = 'time-up';
      //             } else if(response.data[i].timeDiff === 2 || response.data[i].timeDiff === 1){
      //               orderInfo[y].timeStatus = 'two-minute-warning';
      //             } else {
      //               orderInfo[y].timeStatus = 'pending';
      //             }
      //           }
      //         }
      //       }
      //       this.setState({orders:orderInfo});

      //     })
      //     .catch((error) => {

      //     })
      // })
      // .catch((error) => {

      // })
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

  //De-incrementing all of the orders, this is run every minute
  tick = () => {
    const orders = this.state.orders;
    for(let i = 0; i < orders.length; i ++){
      //If the time is not up yet, tick down one minute
      if(orders[i].timeDiff !== 0){
        orders[i].timeDiff --;
        //Setting appropriate time status
        if(orders[i].timeDiff === 0){
          orders[i].timeStatus = 'time-up';
        } else if (orders[i].timeDiff === 2){
          orders[i].timeStatus = 'two-minute-warning';
        }
      }
    }
    this.setState({orders:orders});
  }

  finishOrder = (e) => {
    const id = e.target.name;
    const orders = this.state.orders;
     axios.post('orders/' + e.target.name + '/finish', {
       })
       .then((response) => {
        //Finds the order within the array and changes it's status and sets the new finish time
        for(let i = 0; i < orders.length; i ++){
          if(parseInt(orders[i].id) === parseInt(id)){
            orders[i].finished = true;
            orders[i].finishTime = response.data;
            this.setState({orders:orders});
          }
        }
       })
       .catch((error) => {

       })
  }

  render() {
    let orderCards = this.state.orders.map(order => {
      const finishTime = order.finishTime;
      if(order.finished === false){
        return (
            <Col md="12" className="order-card">
              <Card >
                <CardHeader tag="h3" >Order # {order.id}</CardHeader>
                <CardBody>
                  <CardText>Finish time: {order.finishTime}</CardText>
                  <CardText>Account: {order.email}</CardText>
                  <CardText ><span className={order.timeStatus}>Time left: {order.timeDiff}</span></CardText>
                  <Button className="finish-button" name={order.id} onClick={(e) => this.finishOrder(e)}>Finish Order</Button>
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
      } else {
        return (
            <Col md="12" className="order-card">
              <Card >
                <CardHeader tag="h3" >Order # {order.id}</CardHeader>
                <CardBody>
                  <CardText>Finish time: {order.finishTime}</CardText>
                  <CardText>Account: {order.email}</CardText>
                  <CardText ><span className="finished">Order finished</span></CardText>
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
      }

    })

    return (
      <div>
        <h2>Your Orders!</h2>
        <Container fluid>
          <Row>
            {orderCards}
          </Row>
        </Container>

      </div>
    )
  }
}
export default UserOrderView;

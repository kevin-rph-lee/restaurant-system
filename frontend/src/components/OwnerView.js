import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'




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
  }




  render() {
    let orderCards = this.state.orders.map(order => {
      return (
          <Col md="12">
            <Card>
              <CardBody>
                <CardTitle>Order # {order.id}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>test</CardText>
              </CardBody>
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

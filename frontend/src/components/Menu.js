import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'




class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mains: [],
      drinks: [],
      sides: [],
      orderQuantities: {}
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {
      axios.get('menu_items/mains', {

      })
      .then((response) => {
        this.setState({mains: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })


      axios.get('menu_items/drinks', {

      })
      .then((response) => {
        this.setState({drinks: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })


      axios.get('menu_items/sides', {

      })
      .then((response) => {
        this.setState({sides: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })
  }


  handleSubmitClick = () => {
      const quantities =  this.state.orderQuantities;
      //preventing sending quantity items that are invalid such as 0 or nothing
      for(let i in quantities){
        if( (quantities[i] === '') || (quantities[i] === '0')){
          delete quantities[i];
        }
      }
      axios.post('orders/new', {

        orderQuantities: quantities
      })
      .then((response) => {
        console.log('Order Info: ', response.data);
      })
      .catch((error) => {
        console.log('error is ',error);
      })
  }

  handleQuantityChange = (evt) => {
      let newOrderQuantities = this.state.orderQuantities;
      newOrderQuantities[evt.target.name] = evt.target.value;

  }


  render() {
    let mainsCards = this.state.mains.map(item => {
      return (
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <form>
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </form>
            </Card>
          </Col>
      )
    })

    let drinksCards = this.state.drinks.map(item => {
      return (
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <div className="increment">
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </div>
            </Card>
          </Col>
      )
    })

    let sidesCards = this.state.sides.map(item => {
      return (
          <Col md="4">
            <Card >
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <div className="increment">
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </div>
            </Card>
          </Col>
      )
    })


    return (
      <div>
        <h2>Mains</h2>
        <Container fluid>
          <Row>
            {mainsCards}
          </Row>
        </Container>
        <h2>Sides</h2>
        <Container fluid>
          <Row>
            {sidesCards}
          </Row>
        </Container>
        <h2>Drinks</h2>
        <Container fluid>
          <Row>
            {drinksCards}
          </Row>
        </Container>
         <Button color="primary" className="submit-button" onClick={this.handleSubmitClick}>Submit Order</Button>
      </div>
    )
  }
}
export default Menu;

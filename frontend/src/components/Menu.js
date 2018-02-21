import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col} from 'reactstrap';
import axios from 'axios'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mains: [],
      drinks: [],
      sides: []
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
      </div>
    )
  }
}
export default Menu;

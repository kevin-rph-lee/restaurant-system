import React, { Component } from 'react';
import { Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Media} from 'reactstrap';
import axios from 'axios'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = () => {
      axios.get('menu_items/', {

      })
      .then((response) => {
        this.setState({menuItems: response.data})
        console.log('Menu Items:',this.state.menuItems)
      })
      .catch((error) => {
        console.log('error is ',error);
      })
  }

  render() {
    let menuItemCards = this.state.menuItems.map(item => {
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
    return (
      <div>
        <h2>Mains</h2>
        <Container fluid>
          <Row>
            {menuItemCards}
          </Row>
        </Container>
      </div>
    )
  }
}
export default Menu;

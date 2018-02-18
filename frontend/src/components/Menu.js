import React, { Component } from 'react';
import { Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col} from 'reactstrap';
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
        <Col>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
      )
    })
    return (
      <Container fluid>
        <Row>
          {menuItemCards}
        </Row>
      </Container>
    )
  }
}
export default Menu;
